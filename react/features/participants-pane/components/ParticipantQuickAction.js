// @flow

import React from 'react';

import { QUICK_ACTION_BUTTON } from '../constants';

import AskToUnmuteButton from './AskToUnmuteButton';
import { QuickActionButton } from './web/styled';

type Props = {

    /**
     * The translated ask unmute aria label.
     */
    ariaLabel?: boolean,

    /**
     * The translated "ask unmute" text.
     */
    askUnmuteText: string,

    /**
     * The type of button to be displayed.
     */
    buttonType: string,

    /**
     * Callback used to open a confirmation dialog for audio muting.
     */
    muteAudio: Function,

    /**
     * Label for mute participant button.
     */
    muteParticipantButtonText: string,

    /**
     * The ID of the participant.
     */
    participantID: string,
}

/**
 * Component used to display mute/ask to unmute button.
 *
 * @param {Props} props - The props of the component.
 * @returns {React$Element<'button'>}
 */
export default function ParticipantQuickAction({
    askUnmuteText,
    buttonType,
    muteAudio,
    muteParticipantButtonText,
    participantID
}: Props) {
    switch (buttonType) {
    case QUICK_ACTION_BUTTON.MUTE: {
        return (
            <QuickActionButton
                onClick = { muteAudio(participantID) }
                primary = { true }>
                { muteParticipantButtonText }
            </QuickActionButton>
        );
    }
    default: {
        return (
            <AskToUnmuteButton
                askUnmuteText = { askUnmuteText }
                participantID = { participantID } />
        );
    }
    }
}
