// @flow

import React, { Component } from 'react';

import ReadingsMessage from './ReadingsMessage';

type Props = {

    /**
     * Additional CSS classes to apply to the root element.
     */
    className: string,

    /**
     * The messages to display as a group.
     */
    messages: Array<Object>,
};

/**
 * Displays a list of readings messages. Will show only the display name for the
 * first readings message and the timestamp for the last readings message.
 *
 * @extends React.Component
 */
class ReadingsMessageGroup extends Component<Props> {
    static defaultProps = {
        className: ''
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        const { className, messages } = this.props;

        const messagesLength = messages.length;

        if (!messagesLength) {
            return null;
        }

        return (
            <div className = { `readings-message-group ${className}` }>
                {
                    messages.map((message, i) => (
                        <ReadingsMessage
                            key = { i }
                            message = { message }
                            showDisplayName = { i === 0 }
                            showTimestamp = { i === messages.length - 1 } />
                    ))
                }
            </div>
        );
    }
}

export default ReadingsMessageGroup;
