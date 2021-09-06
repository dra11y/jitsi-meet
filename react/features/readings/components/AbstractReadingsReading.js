// @flow

import { PureComponent } from 'react';

import { READING_TYPE_ERROR, READING_TYPE_DEVOTIONAL } from '../types';
import { Reading } from '../types'

/**
 * The type of the React {@code Component} props of {@code AbstractReadingsReading}.
 */
export type Props = {

    /**
     * The representation of a readings reading.
     */
    reading: Reading,

    /**
     * Invoked to receive translated strings.
     */
    t: Function
};

/**
 * Abstract component to display a readings reading.
 */
export default class AbstractReadingsReading<P: Props> extends PureComponent<P> {
    /**
     * Generates the reading text to be rendered in the component.
     *
     * @returns {string}
     */
    _getReadingText() {
        const { reading } = this.props;

        return reading.readingType === READING_TYPE_ERROR
            ? this.props.t('readings.error', {
                error: reading.body
            })
            : reading.body;
    }
}
