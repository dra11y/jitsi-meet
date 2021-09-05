// @flow

import {
    ADD_READING,
    CLEAR_READINGS,
    CLOSE_READINGS,
    SEND_READING
} from './actionTypes';
import type { Reading } from './types';

/**
 * Adds a readings reading to the collection of readings.
 *
 * @param {Object} readingDetails - The readings reading to save.
 * @param {string} readingDetails.reading - The received reading to display.
 * @param {string} readingDetails.readingType - The kind of reading, such as
 * "error" or "local" or "remote".
 * @returns {{
 *     type: ADD_READING,
 *     reading: Reading,
 * }}
 */
export function addReading(reading: Reading) {
    return {
        type: ADD_READING,
        reading
    };
}

/**
 * Clears the readings readings in Redux.
 *
 * @returns {{
 *     type: CLEAR_READINGS
 * }}
 */
export function clearReadings() {
    return {
        type: CLEAR_READINGS
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
    return {
        type: CLOSE_READINGS
    };
}

/**
 * Sends a readings reading to everyone in the conference.
 *
 * @param {string} reading - The readings reading to send out.
 * @returns {{
 *     type: SEND_READING,
 *     reading: Reading
 * }}
 */
export function sendReading(reading: Reading) {
    return {
        type: SEND_READING,
        reading
    };
}
