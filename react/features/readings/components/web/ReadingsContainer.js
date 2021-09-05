// @flow

import React from 'react';

import { READING_TYPE_DEVOTIONAL } from '../../constants';
import AbstractReadingsContainer, { type Props }
    from '../AbstractReadingsContainer';

import ReadingsReading from './ReadingsReading';

/**
 * Displays all received readings readings, grouped by sender.
 *
 * @extends AbstractReadingsContainer
 */
export default class ReadingsContainer extends AbstractReadingsContainer<Props> {
    // /**
    //  * Whether or not readings has been scrolled to the bottom of the screen. Used
    //  * to determine if readings should be scrolled automatically to the bottom when
    //  * the {@code ReadingsInput} resizes.
    //  */
    // _isScrolledToBottom: boolean;

    // /**
    //  * Reference to the HTML element at the end of the list of displayed readings
    //  * readings. Used for scrolling to the end of the readings readings.
    //  */
    // _readingsListEndRef: Object;

    // /**
    //  * A React ref to the HTML element containing all {@code ReadingsReadingGroup}
    //  * instances.
    //  */
    // _readingListRef: Object;

    /**
     * Initializes a new {@code ReadingsContainer} instance.
     *
     * @param {Props} props - The React {@code Component} props to initialize
     * the new {@code ReadingsContainer} instance with.
     */
    constructor(props: Props) {
        super(props);

        // this._isScrolledToBottom = true;

        // this._readingListRef = React.createRef();
        // this._readingsListEndRef = React.createRef();

        // this._onReadingsScroll = this._onReadingsScroll.bind(this);
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        console.log('rendering readings...')

        const readings = this._getOrderedReadings().map((reading, index) => {
            const readingType = reading.readingType;
            return (
                <ReadingsReading
                    key = { index }
                    reading = { reading } />
            );
        })

        return (
            <div
                aria-labelledby = 'readings-header'
                id = 'readingsconversation'
                // onScroll = { this._onReadingsScroll }
                // ref = { this._readingListRef }
                role = 'log'
                tabIndex = { 0 }>
                    readings should show up here:
                    { readings }
                {/* <div ref = { this._readingsListEndRef } /> */}
            </div>
        );
    }

    _getOrderedReadings: () => Array<Object>;

    // _onReadingsScroll: () => void;

    // /**
    //  * Callback invoked to listen to the current scroll location.
    //  *
    //  * @private
    //  * @returns {void}
    //  */
    // _onReadingsScroll() {
    //     const element = this._readingListRef.current;

    //     this._isScrolledToBottom
    //         = element.scrollHeight - element.scrollTop === element.clientHeight;
    // }
}
