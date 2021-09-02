// @flow

import { PureComponent } from 'react';

import { getLocalizedDateFormatter } from '../../base/i18n';
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_LOCAL } from '../constants';

/**
 * Formatter string to display the message timestamp.
 */
const TIMESTAMP_FORMAT = 'H:mm';

/**
 * The type of the React {@code Component} props of {@code AbstractReadingsMessage}.
 */
export type Props = {

    /**
     * The representation of a readings message.
     */
    message: Object,

    /**
     * Whether or not the avatar image of the participant which sent the message
     * should be displayed.
     */
    showAvatar: boolean,

    /**
     * Whether or not the name of the participant which sent the message should
     * be displayed.
     */
    showDisplayName: boolean,

    /**
     * Whether or not the time at which the message was sent should be
     * displayed.
     */
    showTimestamp: boolean,

    /**
     * Invoked to receive translated strings.
     */
    t: Function
};

/**
 * Abstract component to display a readings message.
 */
export default class AbstractReadingsMessage<P: Props> extends PureComponent<P> {
    /**
     * Returns the timestamp to display for the message.
     *
     * @returns {string}
     */
    _getFormattedTimestamp() {
        return getLocalizedDateFormatter(new Date(this.props.message.timestamp))
            .format(TIMESTAMP_FORMAT);
    }

    /**
     * Generates the message text to be rendered in the component.
     *
     * @returns {string}
     */
    _getMessageText() {
        const { message } = this.props;

        return message.messageType === MESSAGE_TYPE_ERROR
            ? this.props.t('readings.error', {
                error: message.message
            })
            : message.message;
    }

    /**
     * Returns the message that is displayed as a notice for private messages.
     *
     * @returns {string}
     */
    _getPrivateNoticeMessage() {
        const { message, t } = this.props;

        return t('readings.privateNotice', {
            recipient: message.messageType === MESSAGE_TYPE_LOCAL ? message.recipient : t('readings.you')
        });
    }
}
