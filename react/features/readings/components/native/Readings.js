// @flow

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { translate } from '../../../base/i18n';
import { JitsiModal } from '../../../base/modal';
import { connect } from '../../../base/redux';
import { PollsPane } from '../../../polls/components';
import { closeReadings } from '../../actions.any';
import { BUTTON_MODES, READINGS_VIEW_MODAL_ID } from '../../constants';
import AbstractReadings, {
    _mapStateToProps,
    type Props
} from '../AbstractReadings';

import ReadingsInputBar from './ReadingsInputBar';
import ReadingsContainer from './ReadingsContainer';
import ReadingRecipient from './ReadingRecipient';
import styles from './styles';

/**
 * Implements a React native component that renders the readings window (modal) of
 * the mobile client.
 */
class Readings extends AbstractReadings<Props> {
    /**
     * Creates a new instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onClose = this._onClose.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <JitsiModal
                headerProps = {{
                    headerLabelKey: 'readings.title'
                }}
                modalId = { READINGS_VIEW_MODAL_ID }
                onClose = { this._onClose }>
                {this.props._isPollsEnabled && <View style = { styles.tabContainer }>
                    <Button
                        color = '#17a0db'
                        mode = {
                            this.props._isPollsTabFocused
                                ? BUTTON_MODES.CONTAINED
                                : BUTTON_MODES.TEXT
                        }
                        onPress = { this._onToggleReadingsTab }
                        style = { styles.tabLeftButton }
                        uppercase = { false }>
                        {`${this.props.t('readings.tabs.readings')}${this.props._isPollsTabFocused
                                && this.props._nbUnreadReadings > 0
                            ? `(${this.props._nbUnreadReadings})`
                            : ''
                        }`}
                    </Button>
                    <Button
                        color = '#17a0db'
                        mode = {
                            this.props._isPollsTabFocused
                                ? BUTTON_MODES.TEXT
                                : BUTTON_MODES.CONTAINED
                        }
                        onPress = { this._onTogglePollsTab }
                        style = { styles.tabRightButton }
                        uppercase = { false }>
                        {`${this.props.t('readings.tabs.polls')}${!this.props._isPollsTabFocused
                                && this.props._nbUnreadPolls > 0
                            ? `(${this.props._nbUnreadPolls})`
                            : ''
                        }`}
                    </Button>
                </View>}
                {this.props._isPollsTabFocused
                    ? <PollsPane />
                    : (
                    <>
                        <ReadingsContainer readings = { this.props._readings } />
                        <ReadingRecipient />
                        <ReadingsInputBar onSend = { this._onSendReading } />
                    </>
                    )}
            </JitsiModal>
        );
    }

    _onSendReading: (string) => void;

    _onClose: () => boolean

    _onTogglePollsTab: () => void;
    _onToggleReadingsTab: () => void;

    /**
     * Closes the modal.
     *
     * @returns {boolean}
     */
    _onClose() {
        this.props.dispatch(closeReadings());

        return true;
    }
}

export default translate(connect(_mapStateToProps)(Readings));
