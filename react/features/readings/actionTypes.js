// @flow

/**
 * The type of the action which signals to add a new readings reading.
 *
 * {
 *     type: ADD_READING,
 *     reading: Reading,
 * }
 */
export const ADD_READING = 'ADD_READING';

/**
 * The type of the action which signals to clear readings in Redux.
 *
 * {
 *     type: CLEAR_READINGS
 * }
 */
export const CLEAR_READINGS = 'CLEAR_READINGS';

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
 * The type of the action which signals a send a readings reading to everyone in the
 * conference.
 *
 * {
 *     type: SEND_READING,
 *     reading: Reading
 * }
 */
export const SEND_READING = 'SEND_READING';
