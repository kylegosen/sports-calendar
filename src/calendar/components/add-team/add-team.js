import React from 'react';

import ReactModal from 'react-modal';

import {addTeamModal, addTeamContent, addTeamButtonGroup,
    primaryButton, secondaryButton} from './add-team.module.scss';

const AddTeam = (props) => {
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={props.isOpen}>
            <div className={addTeamModal}>
                <div>Header</div>
                <div className={addTeamContent}>Content</div>
                <div className={addTeamButtonGroup}>
                    <div className={secondaryButton} onClick={() => props.onCancel()}>Cancel</div>
                    <div className={primaryButton} onClick={() => props.onAdd()}>Add</div>
                </div>
            </div>
        </ReactModal>
    )
};

export default AddTeam;