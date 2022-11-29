import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './UploadVideoModalPage.css';
import UploadVideoModalPage from './UploadVideoModalPage';

function UploadVideoModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='add-video-button-wrapper'>
            <div id='add-video-button'
            onClick={() => setShowModal(true)}
            ><i className='fa-solid fa-file-video' id='video-add-icon'/></div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <UploadVideoModalPage setShowModal={setShowModal}/>
            </Modal>
      )}
        </div>
    )
}

export default UploadVideoModal;
