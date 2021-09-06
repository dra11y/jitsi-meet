// @flow

import { ReducerRegistry } from '../base/redux';

import { SET_CURRENT_READING, RECEIVE_READING, CLOSE_READINGS, OPEN_READINGS } from './actions';

const DEFAULT_STATE = {
    isOpen: false,
    readings: []
};

ReducerRegistry.register('features/readings', (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case RECEIVE_READING: {
        const receivedReading = action.reading;

        // React native, unlike web, needs a reverse sorted reading list.
        const readings = navigator.product === 'ReactNative'
            ? [
                receivedReading,
                ...state.readings
            ]
            : [
                ...state.readings,
                receivedReading
            ];

        return {
            ...state,
            readings
        };
    }

    case SET_CURRENT_READING:
        return {
            ...state,
            currentReading: action.index
        };

    case OPEN_READINGS:
        return {
            ...state,
            isOpen: true
        };

    case CLOSE_READINGS:
        return {
            ...state,
            isOpen: false
        };

    }

    return state;
});
