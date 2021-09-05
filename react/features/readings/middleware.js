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
import {
    showToolbox
} from '../toolbox/actions';

import type { Reading } from './types';
import { ADD_READING, SEND_READING, OPEN_READINGS, CLOSE_READINGS } from './actionTypes';
import { addReading, clearReadings } from './actions';
import { closeReadings } from './actions.any';
import {
    COMMAND_NEW_READING,
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
                type: COMMAND_NEW_READING,
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

            const receiveMessage = (_, data) => {
                switch (data.type) {
                case COMMAND_NEW_READING: {
                    const { reading } = data;

                    dispatch(addReading(reading));
                    // dispatch(showNotification({
                    //     appearance: NOTIFICATION_TYPE.NORMAL,
                    //     titleKey: 'readings.notification.title',
                    //     descriptionKey: 'readings.notification.description'
                    // }, NOTIFICATION_TIMEOUT));
                    break;

                }
                }
            };

            conference.on(JitsiConferenceEvents.ENDPOINT_MESSAGE_RECEIVED, receiveMessage);
            conference.on(JitsiConferenceEvents.NON_PARTICIPANT_MESSAGE_RECEIVED, receiveMessage);

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
