// @flow

import React from 'react';

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { toggleReadings } from '../../actions.web';
import AbstractReadings, {
    _mapStateToProps,
    type Props
} from '../AbstractReadings';

import ReadingsDialog from './ReadingsDialog';
import Header from './ReadingsDialogHeader';
import ReadingsInput from './ReadingsInput';
import DisplayNameForm from './DisplayNameForm';
import KeyboardAvoider from './KeyboardAvoider';
import MessageContainer from './MessageContainer';
import TouchmoveHack from './TouchmoveHack';

/**
 * React Component for holding the readings feature in a side panel that slides in
 * and out of view.
 */
class Readings extends AbstractReadings<Props> {

    /**
     * Whether or not the {@code Readings} component is off-screen, having finished
     * its hiding animation.
     */
    _isExited: boolean;

    /**
     * Reference to the React Component for displaying readings messages. Used for
     * scrolling to the end of the readings messages.
     */
    _messageContainerRef: Object;

    /**
     * Initializes a new {@code Readings} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._isExited = true;
        this._messageContainerRef = React.createRef();

        // Bind event handlers so they are only bound once for every instance.
        this._renderPanelContent = this._renderPanelContent.bind(this);
        this._onReadingsInputResize = this._onReadingsInputResize.bind(this);
        this._onEscClick = this._onEscClick.bind(this);
        this._onToggleReadings = this._onToggleReadings.bind(this);
    }

    /**
     * Implements {@code Component#componentDidMount}.
     *
     * @inheritdoc
     */
    componentDidMount() {
        this._scrollMessageContainerToBottom(true);
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps) {
        if (this.props._messages !== prevProps._messages) {
            this._scrollMessageContainerToBottom(true);
        } else if (this.props._isOpen && !prevProps._isOpen) {
            this._scrollMessageContainerToBottom(false);
        }
    }
    _onEscClick: (KeyboardEvent) => void;

    /**
     * Click handler for the readings sidenav.
     *
     * @param {KeyboardEvent} event - Esc key click to close the popup.
     * @returns {void}
     */
    _onEscClick(event) {
        if (event.key === 'Escape' && this.props._isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this._onToggleReadings();
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
            <>
                { this._renderPanelContent() }
            </>
        );
    }

    _onReadingsInputResize: () => void;

    /**
     * Callback invoked when {@code ReadingsInput} changes height. Preserves
     * displaying the latest message if it is scrolled to.
     *
     * @private
     * @returns {void}
     */
    _onReadingsInputResize() {
        this._messageContainerRef.current.maybeUpdateBottomScroll();
    }

    /**
     * Returns a React Element for showing readings messages and a form to send new
     * readings messages.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderReadings() {

        return (
            <>
                <TouchmoveHack isModal = { this.props._isModal }>
                    <MessageContainer
                        messages = { this.props._messages }
                        ref = { this._messageContainerRef } />
                </TouchmoveHack>
                <ReadingsInput
                    onResize = { this._onReadingsInputResize }
                    onSend = { this._onSendMessage } />
                <KeyboardAvoider />
            </>
        );
    }

    /**
     * Returns a React Element showing the Readings tab.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderTabs() {

        return (
            <div className = { 'readings-tabs-container' }>
                <div
                    className = { `readings-tab readings-tab-focus` }>
                    <span className = { 'readings-tab-title' }>
                        {this.props.t('readings.tabs.readings')}
                    </span>
                </div>
                <div
                    className = { `readings-tab` }>
                    <span className = { 'readings-tab-title' }>
                        delete polls tab
                    </span>
                </div>
            </div>
        );
    }

    /**
     * Instantiates a React Element to display at the top of {@code Readings} to
     * close {@code Readings}.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderReadingsHeader() {
        return (
            <Header
                className = 'readings-header'
                id = 'readings-header'
                onCancel = { this._onToggleReadings } />
        );
    }

    _renderPanelContent: () => React$Node | null;

    /**
     * Renders the contents of the readings panel.
     *
     * @private
     * @returns {ReactElement | null}
     */
    _renderPanelContent() {
        const { _isModal, _isOpen, _showNamePrompt } = this.props;
        let ComponentToRender = null;

        if (_isOpen) {
            if (_isModal) {
                ComponentToRender = (
                    <ReadingsDialog>
                        { _showNamePrompt ? <DisplayNameForm /> : this._renderReadings() }
                    </ReadingsDialog>
                );
            } else {
                ComponentToRender = (
                    <>
                        { this._renderReadingsHeader() }
                        { _showNamePrompt ? <DisplayNameForm /> : this._renderReadings() }
                    </>
                );
            }
        }
        let className = '';

        if (_isOpen) {
            className = 'slideInExt';
        } else if (this._isExited) {
            className = 'invisible';
        }

        return (
            <div
                aria-haspopup = 'true'
                className = { `sideToolbarContainer ${className}` }
                id = 'sideToolbarContainer'
                onKeyDown = { this._onEscClick } >
                { ComponentToRender }
            </div>
        );
    }

    /**
     * Scrolls the readings messages so the latest message is visible.
     *
     * @param {boolean} withAnimation - Whether or not to show a scrolling
     * animation.
     * @private
     * @returns {void}
     */
    _scrollMessageContainerToBottom(withAnimation) {
        if (this._messageContainerRef.current) {
            this._messageContainerRef.current.scrollToBottom(withAnimation);
        }
    }

    _onSendMessage: (string) => void;

    _onToggleReadings: () => void;

    /**
    * Toggles the readings window.
    *
    * @returns {Function}
    */
    _onToggleReadings() {
        this.props.dispatch(toggleReadings());
    }

}

export default translate(connect(_mapStateToProps)(Readings));
