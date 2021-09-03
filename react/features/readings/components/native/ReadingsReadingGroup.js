// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { READING_TYPE_LOCAL, READING_TYPE_REMOTE } from '../../constants';

import ReadingsReading from './ReadingsReading';
import styles from './styles';

type Props = {

  /**
   * The readings array to render.
   */
  readings: Array<Object>
}

/**
 * Implements a container to render all the readings readings in a conference.
 */
export default class ReadingsReadingGroup extends Component<Props> {
    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._keyExtractor = this._keyExtractor.bind(this);
        this._renderReading = this._renderReading.bind(this);
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <FlatList
                data = { this.props.readings }
                inverted = { true }
                keyExtractor = { this._keyExtractor }
                renderItem = { this._renderReading }
                style = { styles.readingsContainer } />
        );
    }

    _keyExtractor: Object => string

    /**
     * Key extractor for the flatlist.
     *
     * @param {Object} item - The flatlist item that we need the key to be
     * generated for.
     * @param {number} index - The index of the element.
     * @returns {string}
     */
    _keyExtractor(item, index) {
        return `key_${index}`;
    }

    _renderReading: Object => React$Element<*>;

    /**
     * Renders a single readings reading.
     *
     * @param {Object} reading - The readings reading to render.
     * @returns {React$Element<*>}
     */
    _renderReading({ index, item: reading }) {
        return (
            <ReadingsReading
                reading = { reading }
                showAvatar = {
                    this.props.readings[0].readingType !== READING_TYPE_LOCAL
                        && index === this.props.readings.length - 1
                }
                showDisplayName = {
                    this.props.readings[0].readingType === READING_TYPE_REMOTE
                        && index === this.props.readings.length - 1
                }
                showTimestamp = { index === 0 } />
        );
    }
}
