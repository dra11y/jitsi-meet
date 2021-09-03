// @flow

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';

const BUBBLE_RADIUS = 8;

/**
 * The styles of the feature readings.
 *
 * NOTE: Sizes and colors come from the 8x8 guidelines. This is the first
 * component to receive this treating, if others happen to have similar, we
 * need to extract the brand colors and sizes into a branding feature (planned
 * for the future).
 */
export default {

    /**
     * Wrapper View for the avatar.
     */
    avatarWrapper: {
        marginRight: 8,
        width: 32
    },

    readingsLink: {
        color: ColorPalette.blue
    },

    /**
     * Wrapper for the details together, such as name, reading and time.
     */
    detailsWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column'
    },

    emptyComponentWrapper: {
        alignSelf: 'center',
        flex: 1,
        padding: BoxModel.padding,
        paddingTop: '10%'
    },

    /**
     * A special padding to avoid issues on some devices (such as Android devices with custom suggestions bar).
     */
    extraBarPadding: {
        paddingBottom: 30
    },

    inputBar: {
        alignItems: 'center',
        borderTopColor: 'rgb(209, 219, 231)',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: BoxModel.padding
    },

    inputField: {
        color: 'rgb(28, 32, 37)',
        flex: 1,
        height: 48
    },

    readingBubble: {
        alignItems: 'center',
        borderRadius: BUBBLE_RADIUS,
        flexDirection: 'row'
    },

    readingsContainer: {
        flex: 1
    },

    /**
     * Wrapper View for the entire block.
     */
    readingWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 4
    },

    /**
     * Style modifier for the {@code detailsWrapper} for own readings.
     */
    ownReadingDetailsWrapper: {
        alignItems: 'flex-end'
    },

    replyWrapper: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    sendButtonIcon: {
        color: ColorPalette.darkGrey,
        fontSize: 22
    },

    /**
     * Style modifier for system (error) readings.
     */
    systemReadingBubble: {
        backgroundColor: 'rgb(247, 215, 215)'
    },

    /**
     * Wrapper for the name and the reading text.
     */
    textWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 9
    },

    /**
     * Text node for the timestamp.
     */
    timeText: {
        color: 'rgb(164, 184, 209)',
        fontSize: 13
    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    tabLeftButton: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    tabRightButton: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
};

ColorSchemeRegistry.register('Readings', {
    /**
     * Background of the readings screen.
     */
    backdrop: {
        backgroundColor: schemeColor('background'),
        flex: 1
    },

    /**
     * The text node for the display name.
     */
    displayName: {
        color: schemeColor('displayName'),
        fontSize: 13
    },

    emptyComponentText: {
        color: schemeColor('displayName'),
        textAlign: 'center'
    },

    localReadingBubble: {
        backgroundColor: schemeColor('localMsgBackground'),
        borderTopRightRadius: 0
    },

    readingRecipientCancelIcon: {
        color: schemeColor('icon'),
        fontSize: 18
    },

    readingRecipientContainer: {
        alignItems: 'center',
        backgroundColor: schemeColor('privateMsgBackground'),
        flexDirection: 'row',
        padding: BoxModel.padding
    },

    readingRecipientText: {
        color: schemeColor('text'),
        flex: 1
    },

    privateNotice: {
        color: schemeColor('privateMsgNotice'),
        fontSize: 11,
        marginTop: 6
    },

    privateReadingBubble: {
        backgroundColor: schemeColor('privateMsgBackground')
    },

    remoteReadingBubble: {
        backgroundColor: schemeColor('remoteMsgBackground'),
        borderTopLeftRadius: 0
    },

    replyContainer: {
        alignSelf: 'stretch',
        borderLeftColor: schemeColor('replyBorder'),
        borderLeftWidth: 1,
        justifyContent: 'center'
    },

    replyStyles: {
        iconStyle: {
            color: schemeColor('replyIcon'),
            fontSize: 22,
            padding: 8
        }
    }
});
