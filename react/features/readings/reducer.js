// @flow

import { ReducerRegistry } from '../base/redux';

import {
    ADD_READING,
    CLEAR_READINGS,
    CLOSE_READINGS,
    OPEN_READINGS
} from './actionTypes';

const DEFAULT_STATE = {
    isOpen: false,
    readings: []
};

ReducerRegistry.register('features/readings', (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case ADD_READING: {
        const newReading = {
            error: action.error,
            id: action.id,
            readingType: action.readingType,
            reading: action.reading
        };

        // React native, unlike web, needs a reverse sorted reading list.
        const readings = navigator.product === 'ReactNative'
            ? [
                newReading,
                ...state.readings
            ]
            : [
                ...state.readings,
                newReading
            ];

        return {
            ...state,
            readings
        };
    }

    case CLEAR_READINGS:
        return {
            ...state,
            readings: []
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
