// @flow

import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import AbstractReadingsContainer, { type Props as AbstractProps }
    from '../AbstractReadingsContainer';

import ReadingsReadingGroup from './ReadingsReadingGroup';
import styles from './styles';

type Props = AbstractProps & {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * Implements a container to render all the readings readings in a conference.
 */
class ReadingsContainer extends AbstractReadingsContainer<Props> {
    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._keyExtractor = this._keyExtractor.bind(this);
        this._renderListEmptyComponent = this._renderListEmptyComponent.bind(this);
        this._renderReadingGroup = this._renderReadingGroup.bind(this);
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const data = this._getReadingsGroupedBySender();

        return (
            <FlatList
                ListEmptyComponent = { this._renderListEmptyComponent }
                data = { data }

                // Workaround for RN bug:
                // https://github.com/facebook/react-native/issues/21196
                inverted = { Boolean(data.length) }
                keyExtractor = { this._keyExtractor }
                keyboardShouldPersistTaps = 'always'
                renderItem = { this._renderReadingGroup }
                style = { styles.readingsContainer } />
        );
    }

    _getReadingsGroupedBySender: () => Array<Array<Object>>;

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

    _renderListEmptyComponent: () => React$Element<any>;

    /**
     * Renders a reading when there are no readings in the readings yet.
     *
     * @returns {React$Element<any>}
     */
    _renderListEmptyComponent() {
        const { _styles, t } = this.props;

        return (
            <View style = { styles.emptyComponentWrapper }>
                <Text style = { _styles.emptyComponentText }>
                    { t('readings.noReadingsReading') }
                </Text>
            </View>
        );
    }

    _renderReadingGroup: Object => React$Element<any>;

    /**
     * Renders a single readings reading.
     *
     * @param {Array<Object>} readings - The readings reading to render.
     * @returns {React$Element<*>}
     */
    _renderReadingGroup({ item: readings }) {
        return <ReadingsReadingGroup readings = { readings } />;
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

export default translate(connect(_mapStateToProps)(ReadingsContainer));
