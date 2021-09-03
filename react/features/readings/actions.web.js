// @flow

import type { Dispatch } from 'redux';

import VideoLayout from '../../../modules/UI/videolayout/VideoLayout';

import { OPEN_READINGS } from './actionTypes';
import { closeReadings } from './actions.any';

export * from './actions.any';

/**
 * Displays the readings panel.
 *
 * @param {Object} participant - The recipient for the private readings.
 * @returns {{
 *     participant: Participant,
 *     type: OPEN_READINGS
 * }}
 */
export function openReadings(participant: Object) {
    return function(dispatch: (Object) => Object) {
        dispatch({
            participant,
            type: OPEN_READINGS
        });
    };
}

/**
 * Toggles display of the readings panel.
 *
 * @returns {Function}
 */
export function toggleReadings() {
    return (dispatch: Dispatch<any>, getState: Function) => {
        const isOpen = getState()['features/readings'].isOpen;

        if (isOpen) {
            dispatch(closeReadings());
        } else {
            dispatch(openReadings());
        }

        // Recompute the large video size whenever we toggle the readings, as it takes readings state into account.
        VideoLayout.onResize();
    };
}
