// @flow

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { translate } from '../../../base/i18n';
import { JitsiModal } from '../../../base/modal';
import { connect } from '../../../base/redux';
import { closeReadings } from '../../actions';
import { READINGS_VIEW_MODAL_ID } from '../../constants';
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
