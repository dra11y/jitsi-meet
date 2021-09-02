// @flow

/**
 * The type of the action which signals to add a new readings message.
 *
 * {
 *     type: ADD_MESSAGE,
 *     displayName: string
 *     hasRead: boolean,
 *     id: string,
 *     messageType: string,
 *     message: string,
 *     timestamp: string,
 * }
 */
export const ADD_MESSAGE = 'ADD_MESSAGE';

/**
 * The type of the action which signals to clear messages in Redux.
 *
 * {
 *     type: CLEAR_MESSAGES
 * }
 */
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

/**
 * The type of the action which signals the cancellation the readings panel.
 *
 * {
 *     type: CLOSE_READINGS
 * }
 */
export const CLOSE_READINGS = 'CLOSE_READINGS';

/**
 * The type of the action which signals to display the readings panel.
 *
 * {
 *     type: OPEN_READINGS
 * }
 */
export const OPEN_READINGS = 'OPEN_READINGS';

/**
 * The type of the action which signals a send a readings message to everyone in the
 * conference.
 *
 * {
 *     type: SEND_MESSAGE,
 *     message: string
 * }
 */
export const SEND_MESSAGE = 'SEND_MESSAGE';

/**
 * The type of action which signals the initiation of sending of as private message to the
 * supplied recipient.
 *
 * {
 *     participant: Participant,
 *     type: SET_PRIVATE_MESSAGE_RECIPIENT
 * }
 */
export const SET_PRIVATE_MESSAGE_RECIPIENT = 'SET_PRIVATE_MESSAGE_RECIPIENT';
