// @flow

import type { Dispatch } from 'redux';

export const SET_CURRENT_READING = 'SET_CURRENT_READING';
export const CREATE_READING = 'CREATE_READING';
export const RECEIVE_READING = 'RECEIVE_READING';
export const SEND_READING = 'SEND_READING';
export const OPEN_READINGS = 'OPEN_READINGS';
export const CLOSE_READINGS = 'CLOSE_READINGS';

import { Reading } from './types';

import VideoLayout from '../../../modules/UI/videolayout/VideoLayout';

export function setCurrentReading(index: number) {
    return {
        type: SET_CURRENT_READING,
        index
    };
}

export function sendReading(reading: Reading) {
    return {
        type: SEND_READING,
        reading
    };
}

export function receiveReading(reading: Reading) {
    return {
        type: RECEIVE_READING,
        reading
    };
}

export function openReadings() {
    return {
        type: OPEN_READINGS
    };
}

export function closeReadings() {
    return {
        type: CLOSE_READINGS
    };
}

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
