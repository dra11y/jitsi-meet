// @flow

import React from 'react';


import { translate } from '../../../base/i18n';
import { Linkify } from '../../../base/react';
import { READING_TYPE_DEVOTIONAL } from '../../constants';
import AbstractReadingsReading, {
    type Props
} from '../AbstractReadingsReading';

/**
 * Renders a single readings reading.
 */
class ReadingsReading extends AbstractReadingsReading<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { reading, t } = this.props;
        const processedReading = [];

        const txt = this._getReadingText();

        return (
            <div
                className = 'readingsreading-wrapper'
                tabIndex = { -1 }>
                <div className = { `readingsreading` }>
                    <div className = 'replywrapper'>
                        <div className = 'readingcontent'>
                            <div className = 'userreading'>
                                { txt }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _getReadingText: () => string;
}

export default translate(ReadingsReading);
