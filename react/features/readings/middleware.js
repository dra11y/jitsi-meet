// @flow

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../base/app';
import {
    CONFERENCE_JOINED,
    getCurrentConference
} from '../base/conference';
import { openDialog } from '../base/dialog';
import {
    JitsiConferenceErrors,
    JitsiConferenceEvents
} from '../base/lib-jitsi-meet';
import { setActiveModalId } from '../base/modal';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';
import { playSound, registerSound, unregisterSound } from '../base/sounds';
import { endpointMessageReceived } from '../subtitles';
import {
    showToolbox
} from '../toolbox/actions';


import { ADD_READING, SEND_READING, OPEN_READINGS, CLOSE_READINGS } from './actionTypes';
import { addReading, clearReadings } from './actions';
import { closeReadings } from './actions.any';
import {
    READINGS_VIEW_MODAL_ID,
    INCOMING_READING_SOUND_ID,
    READING_TYPE_ERROR,
    READING_TYPE_DEVOTIONAL
} from './constants';
import { INCOMING_READING_SOUND_FILE } from './sounds';

declare var APP: Object;
declare var interfaceConfig : Object;

/**
 * Implements the middleware of the readings feature.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;
    let isOpen;

    switch (action.type) {
    case ADD_READING:
        isOpen = getState()['features/readings'].isOpen;

        // if (typeof APP !== 'undefined') {
        //     APP.API.notifyReadingsUpdated(unreadCount, isOpen);
        // }
        break;

    case APP_WILL_MOUNT:
        dispatch(registerSound(INCOMING_READING_SOUND_ID, INCOMING_READING_SOUND_FILE));
        break;

    case APP_WILL_UNMOUNT:
        dispatch(unregisterSound(INCOMING_READING_SOUND_ID));
        break;

    case CONFERENCE_JOINED:
        _addReadingsMsgListener(action.conference, store);
        break;

    case OPEN_READINGS:
        dispatch(setActiveModalId(READINGS_VIEW_MODAL_ID));

        // if (typeof APP !== 'undefined') {
        //     APP.API.notifyReadingsUpdated(unreadCount, true);
        // }
        break;

    case CLOSE_READINGS: {
        // if (typeof APP !== 'undefined') {
        //     APP.API.notifyReadingsUpdated(unreadCount, false);
        // }

        dispatch(setActiveModalId());
        break;
    }

    case SEND_READING: {
        const state = store.getState();
        const { conference } = state['features/base/conference'];

        if (conference) {
            // if (typeof APP !== 'undefined') {
            //     APP.API.notifySendingReadingsReading(action.reading, Boolean(privateReadingRecipient));
            // }
            // conference.sendTextMessage(action.reading)
            conference.sendMessage({
                type: SEND_READING,
                reading: action.reading
            })
        }
        break;
    }

    }

    return next(action);
});

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. clear readings or close the readings modal if it's left
 * open.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, { dispatch, getState }, previousConference) => {
        if (conference !== previousConference) {
            // conference changed, left or failed...

            if (getState()['features/readings'].isOpen) {
                // Closes the readings if it's left open.
                dispatch(closeReadings());
            }

            // Clear readings readings.
            dispatch(clearReadings());
        }
    });

StateListenerRegistry.register(
    state => state['features/readings'].isOpen,
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
        JitsiConferenceEvents.NON_PARTICIPANT_MESSAGE_RECEIVED,
        (id, message) => {
            if (message.type !== SEND_READING) return

            const { type, ...reading } = message

            _handleReceivedReading(store, {
                id,
                reading
            });
        }
    );

    conference.on(
        JitsiConferenceEvents.CONFERENCE_ERROR, (errorType, error) => {
            errorType === JitsiConferenceErrors.MESSAGE_ERROR && _handleReadingsError(store, error);
        });
}

/**
 * Handles a readings error received from the xmpp server.
 *
 * @param {Store} store - The Redux store.
 * @param  {string} error - The error reading.
 * @returns {void}
 */
function _handleReadingsError({ dispatch }, error) {
    dispatch(addReading({
        hasRead: true,
        readingType: READING_TYPE_ERROR,
        reading: error
    }));
}

/**
 * Function to handle an incoming readings reading.
 *
 * @param {Store} store - The Redux store.
 * @param {Object} reading - The reading object.
 * @param {boolean} shouldPlaySound - Whether or not to play the incoming reading sound.
 * @returns {void}
 */
function _handleReceivedReading({ dispatch, getState },
        { id, reading },
        shouldPlaySound = true
) {
    // Logic for all platforms:
    const state = getState();
    const { isOpen: isReadingsOpen } = state['features/readings'];
    const { disableIncomingMessageSound, iAmRecorder } = state['features/base/config'];
    const { soundsIncomingMessage: soundEnabled } = state['features/base/settings'];

    // if (!disableIncomingMessageSound && soundEnabled && shouldPlaySound && !isReadingsOpen) {
        dispatch(playSound(INCOMING_READING_SOUND_ID));
    // }

    dispatch(addReading({
        id,
        readingType: READING_TYPE_DEVOTIONAL,
        ...reading
    }));

    if (typeof APP !== 'undefined') {
        // Logic for web only:

        // APP.API.notifyReceivedReadingsReading({
        //     body: reading,
        //     id,
        //     nick: displayName,
        //     privateReading,
        //     ts: timestamp
        // });

        if (!iAmRecorder) {
            dispatch(showToolbox(4000));
        }

    }
}
