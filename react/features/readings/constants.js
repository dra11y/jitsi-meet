// @flow

export const READINGS_VIEW_MODAL_ID = 'readingsView';

/**
 * The size of the readings.
 */
export const READINGS_SIZE = 315;

/**
 * The audio ID of the audio element for which the {@link playAudio} action is
 * triggered when new readings reading is received.
 *
 * @type {string}
 */
export const INCOMING_READING_SOUND_ID = 'INCOMING_READING_SOUND';

/**
 * The {@code readingType} of error (system) readings.
 */
export const READING_TYPE_ERROR = 'error';

/**
 * The {@code readingType} of Devotional readings.
 */
export const READING_TYPE_DEVOTIONAL = 'devotional';

export const SMALL_WIDTH_THRESHOLD = 580;

/**
 * The modes of the buttons of the readings and polls tabs.
 */
export const BUTTON_MODES = {
    CONTAINED: 'contained',
    TEXT: 'text'
};
