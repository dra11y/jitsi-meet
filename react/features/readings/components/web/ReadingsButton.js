// @flow

import React from 'react';

import { translate } from '../../../base/i18n';
import { IconChat } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link ReadingsButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not the readings feature is currently displayed.
     */
     _readingsOpen: boolean,

    /**
     * External handler for click action.
     */
    handleClick: Function
};

/**
 * Implementation of a button for accessing readings pane.
 */
class ReadingsButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.readings';
    icon = IconChat;
    label = 'toolbar.openReadings';
    toggledLabel = 'toolbar.closeReadings';

    /**
     * Retrieves tooltip dynamically.
     */
    get tooltip() {
        if (this._isToggled()) {
            return 'toolbar.closeReadings';
        }

        return 'toolbar.openReadings';
    }

    /**
     * Required by linter due to AbstractButton overwritten prop being writable.
     *
     * @param {string} value - The value.
     */
    set tooltip(value) {
        return value;
    }

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.handleClick();
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._readingsOpen;
    }

    /**
     * Overrides AbstractButton's {@link Component#render()}.
     *
     * @override
     * @protected
     * @returns {boReact$Nodeolean}
     */
    render(): React$Node {
        return (
            <div
                className = 'toolbar-button-with-badge'
                key = 'readingscontainer'>
                {super.render()}
            </div>
        );
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
const mapStateToProps = state => {
    return {
        _readingsOpen: state['features/readings'].isOpen
    };
};

export default translate(connect(mapStateToProps)(ReadingsButton));
