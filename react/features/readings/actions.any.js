// @flow

import {
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    CLOSE_READINGS,
    SEND_MESSAGE
} from './actionTypes';

/**
 * Adds a readings message to the collection of messages.
 *
 * @param {Object} messageDetails - The readings message to save.
 * @param {string} messageDetails.displayName - The displayName of the
 * participant that authored the message.
 * @param {boolean} messageDetails.hasRead - Whether or not to immediately mark
 * the message as read.
 * @param {string} messageDetails.message - The received message to display.
 * @param {string} messageDetails.messageType - The kind of message, such as
 * "error" or "local" or "remote".
 * @param {string} messageDetails.timestamp - A timestamp to display for when
 * the message was received.
 * @returns {{
 *     type: ADD_MESSAGE,
 *     displayName: string,
 *     hasRead: boolean,
 *     message: string,
 *     messageType: string,
 *     timestamp: string,
 * }}
 */
export function addMessage(messageDetails: Object) {
    return {
        type: ADD_MESSAGE,
        ...messageDetails
    };
}

/**
 * Clears the readings messages in Redux.
 *
 * @returns {{
 *     type: CLEAR_MESSAGES
 * }}
 */
export function clearMessages() {
    return {
        type: CLEAR_MESSAGES
    };
}

/**
 * Action to signal the closing of the readings dialog.
 *
 * @returns {{
 *     type: CLOSE_READINGS
 * }}
 */
export function closeReadings() {
    document.body.classList.remove('readings')

    return {
        type: CLOSE_READINGS
    };
}

/**
 * Sends a readings message to everyone in the conference.
 *
 * @param {string} message - The readings message to send out.
 * @returns {{
 *     type: SEND_MESSAGE,
 *     message: string
 * }}
 */
export function sendMessage(message: string) {
    return {
        type: SEND_MESSAGE,
        message
    };
}
