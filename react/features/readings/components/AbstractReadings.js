// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';

import { Reading, READING_TYPE_DEVOTIONAL } from '../types';
import { sendReading } from '../actions';
import { READINGS_WIDTH } from '../constants';

export type Props = {
    _isModal: boolean,
    _isOpen: boolean,
    _readings: Array<Object>,
    _currentReading: number,
    _onSendReading: Function,
    _onToggleReadings: Function,
    dispatch: Dispatch<any>,
    t: Function,
};

export default class AbstractReadings<P: Props> extends Component<P> {
    constructor(props: P) {
        super(props);
        this._onSendReading = this._onSendReading.bind(this);
    }

    _onSendReading = (text: string): void => {
        const reading: Reading = {
            readingType: READING_TYPE_DEVOTIONAL,
            id: Math.ceil(Math.random() * 100000000).toString(),
            order: 1,
            body: text
        }

        console.log(reading)

        this.props.dispatch(sendReading(reading));
    }
}

export function _mapStateToProps(state: Object) {
    const { isOpen, readings, currentReading } = state['features/readings'];

    return {
        _isModal: window.innerWidth <= READINGS_WIDTH,
        _isOpen: isOpen,
        _readings: readings,
        _currentReading: currentReading
    };
}
