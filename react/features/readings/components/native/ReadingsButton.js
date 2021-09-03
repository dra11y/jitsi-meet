// @flow

import { READINGS_ENABLED, getFeatureFlag } from '../../../base/flags';
import { IconReadings, IconReadingsUnread } from '../../../base/icons';
import { connect } from '../../../base/redux';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox/components';
import { openReadings } from '../../actions.native';
import { getUnreadCount } from '../../functions';

type Props = AbstractButtonProps & {

    /**
     * The unread reading count.
     */
    _unreadReadingCount: number,

    dispatch: Function
};

/**
 * Implements an {@link AbstractButton} to open the readings screen on mobile.
 */
class ReadingsButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.readings';
    icon = IconReadings;
    label = 'toolbar.readings';
    toggledIcon = IconReadingsUnread;

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(openReadings());
    }

    /**
     * Renders the button toggled when there are unread readings.
     *
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return Boolean(this.props._unreadReadingCount);
    }
}

/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const enabled = getFeatureFlag(state, READINGS_ENABLED, true);
    const { visible = enabled } = ownProps;

    return {
        _unreadReadingCount: getUnreadCount(state),
        visible
    };
}

export default connect(_mapStateToProps)(ReadingsButton);
