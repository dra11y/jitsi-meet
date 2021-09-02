// @flow

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../base/app';
import {
    CONFERENCE_JOINED,
    getCurrentConference
} from '../base/conference';
import {
    JitsiConferenceErrors,
    JitsiConferenceEvents
} from '../base/lib-jitsi-meet';
import { setActiveModalId } from '../base/modal';
import {
    getLocalParticipant,
    getParticipantById,
    getParticipantDisplayName
} from '../base/participants';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';
import { playSound, registerSound, unregisterSound } from '../base/sounds';
import { openDisplayNamePrompt } from '../display-name';
import { ADD_REACTION_MESSAGE } from '../reactions/actionTypes';
import {
    showToolbox
} from '../toolbox/actions';


import { ADD_MESSAGE, SEND_MESSAGE, OPEN_READINGS, CLOSE_READINGS } from './actionTypes';
import { addMessage, clearMessages } from './actions';
import { closeReadings } from './actions.any';
import {
    READINGS_VIEW_MODAL_ID,
    INCOMING_MSG_SOUND_ID,
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_LOCAL,
    MESSAGE_TYPE_REMOTE
} from './constants';
import { getUnreadCount } from './functions';
import { INCOMING_MSG_SOUND_FILE } from './sounds';

declare var APP: Object;

/**
 * Implements the middleware of the readings feature.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;
    const localParticipant = getLocalParticipant(getState());
    let isOpen, unreadCount;

    switch (action.type) {
    case ADD_MESSAGE:
        unreadCount = action.hasRead ? 0 : getUnreadCount(getState()) + 1;
        isOpen = getState()['features/readings'] && getState()['features/readings'].isOpen;

        if (typeof APP !== 'undefined') {
            APP.API.notifyReadingsUpdated(unreadCount, isOpen);
        }
        break;

    case APP_WILL_MOUNT:
        dispatch(
                registerSound(INCOMING_MSG_SOUND_ID, INCOMING_MSG_SOUND_FILE));
        break;

    case APP_WILL_UNMOUNT:
        dispatch(unregisterSound(INCOMING_MSG_SOUND_ID));
        break;

    case CONFERENCE_JOINED:
        _addReadingsMsgListener(action.conference, store);
        break;

    case OPEN_READINGS:
        dispatch(setActiveModalId(READINGS_VIEW_MODAL_ID));

        unreadCount = 0;

        if (typeof APP !== 'undefined') {
            APP.API.notifyReadingsUpdated(unreadCount, true);
        }
        break;

    case CLOSE_READINGS: {
        unreadCount = 0;

        if (typeof APP !== 'undefined') {
            APP.API.notifyReadingsUpdated(unreadCount, false);
        }

        dispatch(setActiveModalId());
        break;
    }

    case SEND_MESSAGE: {
        const state = store.getState();
        const { conference } = state['features/base/conference'];

        if (conference) {
            conference.sendTextMessage(action.message);
        }
        break;
    }

    case ADD_REACTION_MESSAGE: {
        _handleReceivedMessage(store, {
            id: localParticipant.id,
            message: action.message,
            timestamp: Date.now()
        }, false);
    }
    }

    return next(action);
});

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. clear messages or close the readings modal if it's left
 * open.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, { dispatch, getState }, previousConference) => {
        if (conference !== previousConference) {
            // conference changed, left or failed...

            if (getState()['features/readings'] && getState()['features/readings'].isOpen) {
                // Closes the readings if it's left open.
                dispatch(closeReadings());
            }

            // Clear readings messages.
            dispatch(clearMessages());
        }
    });

StateListenerRegistry.register(
    state => state['features/readings'] && state['features/readings'].isOpen,
    (isOpen, { dispatch }) => {
        if (typeof APP !== 'undefined' && isOpen) {
            dispatch(showToolbox());
        }
    }
);

/**
 * Registers listener for {@link JitsiConferenceEvents.MESSAGE_RECEIVED} that
 * will perform various readings related activities.
 *
 * @param {JitsiConference} conference - The conference instance on which the
 * new event listener will be registered.
 * @param {Object} store - The redux store object.
 * @private
 * @returns {void}
 */
function _addReadingsMsgListener(conference, store) {
    if (store.getState()['features/base/config'].iAmRecorder) {
        // We don't register anything on web if we are in iAmRecorder mode
        return;
    }

    conference.on(
        JitsiConferenceEvents.MESSAGE_RECEIVED,
        (id, message, timestamp) => {
            _handleReceivedMessage(store, {
                id,
                message,
                timestamp
            });
        }
    );

    conference.on(
        JitsiConferenceEvents.CONFERENCE_ERROR, (errorType, error) => {
            errorType === JitsiConferenceErrors.READINGS_ERROR && _handleReadingsError(store, error);
        });
}

/**
 * Handles a readings error received from the xmpp server.
 *
 * @param {Store} store - The Redux store.
 * @param  {string} error - The error message.
 * @returns {void}
 */
function _handleReadingsError({ dispatch }, error) {
    dispatch(addMessage({
        hasRead: true,
        messageType: MESSAGE_TYPE_ERROR,
        message: error,
        timestamp: Date.now()
    }));
}

/**
 * Function to handle an incoming readings message.
 *
 * @param {Store} store - The Redux store.
 * @param {Object} message - The message object.
 * @param {boolean} shouldPlaySound - Whether or not to play the incoming message sound.
 * @returns {void}
 */
function _handleReceivedMessage({ dispatch, getState },
        { id, message, timestamp },
        shouldPlaySound = true
) {
    // Logic for all platforms:
    const state = getState();
    const { isOpen: isReadingsOpen } = state['features/readings'];
    const { disableIncomingMessageSound, iAmRecorder } = state['features/base/config'];
    const { soundsIncomingMessage: soundEnabled } = state['features/base/settings'];

    if (!disableIncomingMessageSound && soundEnabled && shouldPlaySound && !isReadingsOpen) {
        dispatch(playSound(INCOMING_MSG_SOUND_ID));
    }

    // Provide a default for for the case when a message is being
    // backfilled for a participant that has left the conference.
    const participant = getParticipantById(state, id) || {};
    const localParticipant = getLocalParticipant(getState);
    const displayName = getParticipantDisplayName(state, id);
    const hasRead = participant.local || isReadingsOpen;
    const timestampToDate = timestamp ? new Date(timestamp) : new Date();
    const millisecondsTimestamp = timestampToDate.getTime();

    dispatch(addMessage({
        displayName,
        hasRead,
        id,
        messageType: participant.local ? MESSAGE_TYPE_LOCAL : MESSAGE_TYPE_REMOTE,
        message,
        recipient: getParticipantDisplayName(state, localParticipant.id),
        timestamp: millisecondsTimestamp
    }));

    if (typeof APP !== 'undefined') {
        // Logic for web only:

        if (!iAmRecorder) {
            dispatch(showToolbox(4000));
        }

    }
}
