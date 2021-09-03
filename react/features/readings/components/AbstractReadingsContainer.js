// @flow

import { PureComponent } from 'react';

export type Props = {

    /**
     * The readings array to render.
     */
    readings: Array<Object>
}

/**
 * Abstract component to display a list of readings readings, grouped by sender.
 *
 * @extends PureComponent
 */
export default class AbstractReadingsContainer<P: Props> extends PureComponent<P> {
    static defaultProps = {
        readings: []
    };

    /**
     * FIXME: Ensures the readings are in order.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getOrderedReadings() {
        return this.props.readings;
    }
}
