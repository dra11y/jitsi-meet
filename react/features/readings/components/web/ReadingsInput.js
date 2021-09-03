// @flow

import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import type { Dispatch } from 'redux';

import { isMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n';
import { Icon, IconPlane } from '../../../base/icons';
import { connect } from '../../../base/redux';

/**
 * The type of the React {@code Component} props of {@link ReadingsInput}.
 */
type Props = {

    /**
     * Invoked to send readings readings.
     */
    dispatch: Dispatch<any>,

    /**
     * Optional callback to invoke when the readings textarea has auto-resized to
     * fit overflowing text.
     */
    onResize: ?Function,

    /**
     * Callback to invoke on reading send.
     */
    onSend: Function,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * The type of the React {@code Component} state of {@link ReadingsInput}.
 */
type State = {

    /**
     * User provided nickname when the input text is provided in the view.
     */
    reading: string
};

/**
 * Implements a React Component for drafting and submitting a readings reading.
 *
 * @extends Component
 */
class ReadingsInput extends Component<Props, State> {
    _textArea: ?HTMLTextAreaElement;

    state = {
        reading: ''
    };

    /**
     * Initializes a new {@code ReadingsInput} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._textArea = null;

        // Bind event handlers so they are only bound once for every instance.
        this._onDetectSubmit = this._onDetectSubmit.bind(this);
        this._onReadingChange = this._onReadingChange.bind(this);
        this._onSubmitReading = this._onSubmitReading.bind(this);
        this._onSubmitReadingKeyPress = this._onSubmitReadingKeyPress.bind(this);
        this._setTextAreaRef = this._setTextAreaRef.bind(this);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}.
     *
     * @inheritdoc
     */
    componentDidMount() {
        if (isMobileBrowser()) {
            // Ensure textarea is not focused when opening readings on mobile browser.
            this._textArea && this._textArea.blur();
        }
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <div className = { `readings-input-container${this.state.reading.trim().length ? ' populated' : ''}` }>
                <div id = 'readings-input' >
                    <div className = 'usrmsg-form'>
                        <TextareaAutosize
                            autoComplete = 'off'
                            autoFocus = { true }
                            id = 'usermsg'
                            maxRows = { 5 }
                            onChange = { this._onReadingChange }
                            onHeightChange = { this.props.onResize }
                            onKeyDown = { this._onDetectSubmit }
                            placeholder = { this.props.t('readings.readingbox') }
                            ref = { this._setTextAreaRef }
                            tabIndex = { 0 }
                            value = { this.state.reading } />
                    </div>
                    <div className = 'send-button-container'>
                        <div
                            aria-label = { this.props.t('readings.sendButton') }
                            className = 'send-button'
                            onClick = { this._onSubmitReading }
                            onKeyPress = { this._onSubmitReadingKeyPress }
                            role = 'button'
                            tabIndex = { this.state.reading.trim() ? 0 : -1 } >
                            <Icon src = { IconPlane } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Place cursor focus on this component's text area.
     *
     * @private
     * @returns {void}
     */
    _focus() {
        this._textArea && this._textArea.focus();
    }


    _onSubmitReading: () => void;

    /**
     * Submits the reading to the readings window.
     *
     * @returns {void}
     */
    _onSubmitReading() {
        const trimmed = this.state.reading.trim();

        if (trimmed) {
            this.props.onSend(trimmed);

            this.setState({ reading: '' });

            // Keep the textarea in focus when sending readings via submit button.
            this._focus();
        }

    }
    _onDetectSubmit: (Object) => void;

    /**
     * Detects if enter has been pressed. If so, submit the reading in the readings
     * window.
     *
     * @param {string} event - Keyboard event.
     * @private
     * @returns {void}
     */
    _onDetectSubmit(event) {
        if (event.key === 'Enter'
            && event.shiftKey === false
            && event.ctrlKey === false) {
            event.preventDefault();
            event.stopPropagation();

            this._onSubmitReading();
        }
    }

    _onSubmitReadingKeyPress: (Object) => void;

    /**
     * KeyPress handler for accessibility.
     *
     * @param {Object} e - The key event to handle.
     *
     * @returns {void}
     */
    _onSubmitReadingKeyPress(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this._onSubmitReading();
        }
    }

    _onReadingChange: (Object) => void;

    /**
     * Updates the known reading the user is drafting.
     *
     * @param {string} event - Keyboard event.
     * @private
     * @returns {void}
     */
    _onReadingChange(event) {
        this.setState({ reading: event.target.value });
    }

    _setTextAreaRef: (?HTMLTextAreaElement) => void;

    /**
     * Sets the reference to the HTML TextArea.
     *
     * @param {HTMLAudioElement} textAreaElement - The HTML text area element.
     * @private
     * @returns {void}
     */
    _setTextAreaRef(textAreaElement: ?HTMLTextAreaElement) {
        this._textArea = textAreaElement;
    }
}

export default translate(connect()(ReadingsInput));
