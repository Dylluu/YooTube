import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './UploadVideoModalPage.css';
import addVid from '../../assets/youtubeAddVid.png';
import UploadVideoModalPage from './UploadVideoModalPage';

function UploadVideoModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='add-video-button-wrapper'>
            <div id='add-video-button'
            onClick={() => setShowModal(true)}
            ><img alt='addVideo' src={addVid} id='video-add-icon'/></div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <UploadVideoModalPage setShowModal={setShowModal}/>
            </Modal>
      )}
        </div>
    )
}

export default UploadVideoModal;
