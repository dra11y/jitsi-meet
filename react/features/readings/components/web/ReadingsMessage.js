// @flow

import React from 'react';

import { translate } from '../../../base/i18n';
import { Linkify } from '../../../base/react';
import AbstractReadingsMessage, {
    type Props
} from '../AbstractReadingsMessage';

/**
 * Renders a single readings message.
 */
class ReadingsMessage extends AbstractReadingsMessage<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { message, t } = this.props;
        const processedMessage = [];

        const txt = this._getMessageText();

        // Tokenize the text
        const tokens = txt.split(' ');

        // Content is an array of text and links
        const content = [];

        for (const token of tokens) {
            content.push(token);
            content.push(' ');
        }

        content.forEach(i => {
            if (typeof i === 'string' && i.includes('://')) {
                processedMessage.push(<Linkify key = { i }>{ i }</Linkify>);
            } else {
                processedMessage.push(i);
            }
        });

        return (
            <div
                className = 'readingsmessage-wrapper'
                tabIndex = { -1 }>
                <div className = { `readingsmessage` }>
                    <div className = 'replywrapper'>
                        <div className = 'messagecontent'>
                            { this.props.showDisplayName && this._renderDisplayName() }
                            <div className = 'usermessage'>
                                <span className = 'sr-only'>
                                    { this.props.message.displayName === this.props.message.recipient
                                        ? t('readings.messageAccessibleTitleMe')
                                        : t('readings.messageAccessibleTitle',
                                        { user: this.props.message.displayName }) }
                                </span>
                                { processedMessage }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _getMessageText: () => string;

    /**
     * Renders the display name of the sender.
     *
     * @returns {React$Element<*>}
     */
    _renderDisplayName() {
        return (
            <div
                aria-hidden = { true }
                className = 'display-name'>
                { this.props.message.displayName }
            </div>
        );
    }
}

export default translate(ReadingsMessage);
