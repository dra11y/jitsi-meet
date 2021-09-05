// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';

import type { Reading } from '../types';
import { sendReading } from '../actions';
import { SMALL_WIDTH_THRESHOLD, READING_TYPE_DEVOTIONAL } from '../constants';

/**
 * The type of the React {@code Component} props of {@code AbstractReadings}.
 */
export type Props = {

    /**
     * Whether the readings is opened in a modal or not (computed based on window width).
     */
    _isModal: boolean,

    /**
     * True if the readings window should be rendered.
     */
    _isOpen: boolean,

    /**
     * All the readings readings in the conference.
     */
    _readings: Array<Object>,

    /**
     * Function to send a text reading.
     *
     * @protected
     */
    _onSendReading: Function,

    /**
     * Function to toggle the readings window.
     */
    _onToggleReadings: Function,

    /**
     * The Redux dispatch function.
     */
    dispatch: Dispatch<any>,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function,
};

/**
 * Implements an abstract readings panel.
 */
export default class AbstractReadings<P: Props> extends Component<P> {

    /**
     * Initializes a new {@code AbstractReadings} instance.
     *
     * @param {Props} props - The React {@code Component} props to initialize
     * the new {@code AbstractReadings} instance with.
     */
    constructor(props: P) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onSendReading = this._onSendReading.bind(this);
    }

    _onSendReading: (string) => void;

    /**
    * Sends a text reading.
    *
    * @private
    * @param {string} text - The reading text to be sent.
    * @returns {void}
    * @type {Function}
    */
    _onSendReading(text: string) {
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

/**
 * Maps (parts of) the redux state to {@link Readings} React {@code Component}
 * props.
 *
 * @param {Object} state - The redux store/state.
 * @private
 * @returns {{
 *     _isOpen: boolean,
 *     _readings: Array<Object>,
 *     _showNamePrompt: boolean
 * }}
 */
export function _mapStateToProps(state: Object) {
    const { isOpen, readings } = state['features/readings'];

    return {
        _isModal: window.innerWidth <= SMALL_WIDTH_THRESHOLD,
        _isOpen: isOpen,
        _readings: readings
    };
}
