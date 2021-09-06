// @flow

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../base/app';
import { CONFERENCE_JOINED, getCurrentConference } from '../base/conference';
import { openDialog } from '../base/dialog';
import { JitsiConferenceErrors, JitsiConferenceEvents } from '../base/lib-jitsi-meet';
import { setActiveModalId } from '../base/modal';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';
import { playSound, registerSound, unregisterSound } from '../base/sounds';
import { showToolbox } from '../toolbox/actions';

import { Reading, READING_TYPE_ERROR, READING_TYPE_DEVOTIONAL } from './types';
import { receiveReading, closeReadings, CREATE_READING, SEND_READING, RECEIVE_READING, OPEN_READINGS, CLOSE_READINGS } from './actions';
import { READINGS_VIEW_MODAL_ID, INCOMING_READING_SOUND_ID, INCOMING_READING_SOUND_FILE } from './constants';

declare var APP: Object;
declare var interfaceConfig : Object;

MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;
    let isOpen;

    switch (action.type) {
    // case ADD_READING:
    //     isOpen = getState()['features/readings'].isOpen;

    //     // if (typeof APP !== 'undefined') {
    //     //     APP.API.notifyReadingsUpdated(unreadCount, isOpen);
    //     // }
    //     break;

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
                type: RECEIVE_READING,
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
                case RECEIVE_READING: {
                    const { reading } = data;

                    dispatch(receiveReading(reading));
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
