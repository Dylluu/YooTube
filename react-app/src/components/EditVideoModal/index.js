import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './EditVideoModalPage.css';
import EditVideoModalPage from './EditVideoModalPage';

function EditVideoModal({ setMenuOpen }) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <span id='edit-button'
            onClick={(e) => {
                e.stopPropagation()
                setShowEditModal(true)
            }}
        >
            <i className="fa-solid fa-pen" id='comment-pen-icon' /> Edit

        </span>
    )
}

export default EditVideoModal;
