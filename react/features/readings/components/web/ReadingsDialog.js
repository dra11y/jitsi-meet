// @flow

import React from 'react';

import { Dialog } from '../../../base/dialog';

import Header from './ReadingsDialogHeader';

type Props = {

    /**
     * Children of the component.
     */
    children: React$Node
}

/**
 * Component that renders the content of the readings in a modal.
 *
 * @returns {React$Element<any>}
 */
function ReadingsDialog({ children }: Props) {
    return (
        <Dialog
            customHeader = { Header }
            disableEnter = { true }
            disableFooter = { true }
            hideCancelButton = { true }
            submitDisabled = { true }
            titleKey = 'readings.title'>
            <div className = 'readings-dialog'>
                {children}
            </div>
        </Dialog>
    );
}

export default ReadingsDialog;
