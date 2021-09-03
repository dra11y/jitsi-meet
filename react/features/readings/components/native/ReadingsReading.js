// @flow

import React from 'react';
import { Text, View } from 'react-native';

import { Avatar } from '../../../base/avatar';
import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { translate } from '../../../base/i18n';
import { Linkify } from '../../../base/react';
import { connect } from '../../../base/redux';
import { type StyleType } from '../../../base/styles';
import { READING_TYPE_ERROR, READING_TYPE_LOCAL } from '../../constants';
import { replaceNonUnicodeEmojis } from '../../functions';
import AbstractReadingsReading, { type Props as AbstractProps } from '../AbstractReadingsReading';
import PrivateReadingButton from '../PrivateReadingButton';

import styles from './styles';

type Props = AbstractProps & {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType
};

/**
 * Renders a single readings reading.
 */
class ReadingsReading extends AbstractReadingsReading<Props> {
    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _styles, reading } = this.props;
        const localReading = reading.readingType === READING_TYPE_LOCAL;
        const { privateReading } = reading;

        // Style arrays that need to be updated in various scenarios, such as
        // error readings or others.
        const detailsWrapperStyle = [
            styles.detailsWrapper
        ];
        const readingBubbleStyle = [
            styles.readingBubble
        ];

        if (localReading) {
            // This is a reading sent by the local participant.

            // The wrapper needs to be aligned to the right.
            detailsWrapperStyle.push(styles.ownReadingDetailsWrapper);

            // The bubble needs some additional styling
            readingBubbleStyle.push(_styles.localReadingBubble);
        } else if (reading.readingType === READING_TYPE_ERROR) {
            // This is a system reading.

            // The bubble needs some additional styling
            readingBubbleStyle.push(styles.systemReadingBubble);
        } else {
            // This is a remote reading sent by a remote participant.

            // The bubble needs some additional styling
            readingBubbleStyle.push(_styles.remoteReadingBubble);
        }

        if (privateReading) {
            readingBubbleStyle.push(_styles.privateReadingBubble);
        }

        return (
            <View style = { styles.readingWrapper } >
                { this._renderAvatar() }
                <View style = { detailsWrapperStyle }>
                    <View style = { readingBubbleStyle }>
                        <View style = { styles.textWrapper } >
                            { this._renderDisplayName() }
                            <Linkify linkStyle = { styles.readingsLink }>
                                { replaceNonUnicodeEmojis(this._getReadingText()) }
                            </Linkify>
                            { this._renderPrivateNotice() }
                        </View>
                        { this._renderPrivateReplyButton() }
                    </View>
                    { this._renderTimestamp() }
                </View>
            </View>
        );
    }

    _getFormattedTimestamp: () => string;

    _getReadingText: () => string;

    _getPrivateNoticeReading: () => string;

    /**
     * Renders the avatar of the sender.
     *
     * @returns {React$Element<*>}
     */
    _renderAvatar() {
        const { reading } = this.props;

        return (
            <View style = { styles.avatarWrapper }>
                { this.props.showAvatar && <Avatar
                    displayName = { reading.displayName }
                    participantId = { reading.id }
                    size = { styles.avatarWrapper.width } />
                }
            </View>
        );
    }

    /**
     * Renders the display name of the sender if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderDisplayName() {
        const { _styles, reading, showDisplayName } = this.props;

        if (!showDisplayName) {
            return null;
        }

        return (
            <Text style = { _styles.displayName }>
                { reading.displayName }
            </Text>
        );
    }

    /**
     * Renders the reading privacy notice, if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderPrivateNotice() {
        const { _styles, reading } = this.props;

        if (!reading.privateReading) {
            return null;
        }

        return (
            <Text style = { _styles.privateNotice }>
                { this._getPrivateNoticeReading() }
            </Text>
        );
    }

    /**
     * Renders the private reply button, if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderPrivateReplyButton() {
        const { _styles, reading } = this.props;
        const { readingType, privateReading } = reading;

        if (!privateReading || readingType === READING_TYPE_LOCAL) {
            return null;
        }

        return (
            <View style = { _styles.replyContainer }>
                <PrivateReadingButton
                    participantID = { reading.id }
                    reply = { true }
                    showLabel = { false }
                    toggledStyles = { _styles.replyStyles } />
            </View>
        );
    }

    /**
     * Renders the time at which the reading was sent, if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderTimestamp() {
        if (!this.props.showTimestamp) {
            return null;
        }

        return (
            <Text style = { styles.timeText }>
                { this._getFormattedTimestamp() }
            </Text>
        );
    }
}

/**
 * Maps part of the redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        _styles: ColorSchemeRegistry.get(state, 'Readings')
    };
}

export default translate(connect(_mapStateToProps)(ReadingsReading));
