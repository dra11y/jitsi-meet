// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';

import { getLocalParticipant } from '../../base/participants';
import { sendMessage } from '../actions';
import { SMALL_WIDTH_THRESHOLD } from '../constants';

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
     * All the readings messages in the conference.
     */
    _messages: Array<Object>,

    /**
     * Number of unread readings messages.
     */
    _nbUnreadMessages: number,

    /**
     * Function to send a text message.
     *
     * @protected
     */
    _onSendMessage: Function,

    /**
     * Function to toggle the readings window.
     */
    _onToggleReadings: Function,

    /**
     * Whether or not to block readings access with a nickname input form.
     */
    _showNamePrompt: boolean,

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
        this._onSendMessage = this._onSendMessage.bind(this);
    }

    _onSendMessage: (string) => void;

    /**
    * Sends a text message.
    *
    * @private
    * @param {string} text - The text message to be sent.
    * @returns {void}
    * @type {Function}
    */
    _onSendMessage(text: string) {
        this.props.dispatch(sendMessage(text));
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
 *     _messages: Array<Object>,
 *     _showNamePrompt: boolean
 * }}
 */
export function _mapStateToProps(state: Object) {
    const { isOpen, messages, nbUnreadMessages } = state['features/readings'];
    const _localParticipant = getLocalParticipant(state);

    return {
        _isModal: window.innerWidth <= SMALL_WIDTH_THRESHOLD,
        _isOpen: isOpen,
        _messages: messages,
        _nbUnreadMessages: nbUnreadMessages,
        _showNamePrompt: !_localParticipant?.name
    };
}
