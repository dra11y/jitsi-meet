// @flow

import { OPEN_READINGS } from './actionTypes';

export * from './actions.any';

/**
 * Displays the readings panel.
 *
 * @param {Object} participant - The recipient for the private readings.
 *
 * @returns {{
 *     participant: Participant,
 *     type: OPEN_READINGS
 * }}
 */
export function openReadings(participant: Object) {
    return {
        participant,
        type: OPEN_READINGS
    };
}
