import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UploadVideoModalPage.css';
import { useDispatch, useSelector } from 'react-redux';

function UploadVideoModalPage({setShowModal}) {

    const [videoDropped, setVideoDropped] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoThumbnail, setVideoThumbnail] = useState('');

    useEffect(() => {
        const videoUpload = document.getElementById('file-upload');
        videoUpload.addEventListener('change', async (e) => {
            e.preventDefault();
            const video = videoUpload.files[0];
            setVideoTitle(video?.name);
            handleVideoDropped();
        })
    }, [])

    function handleVideoDropped() {
        const firstUploadForm = document.getElementsByClassName('upload-video-page-body');
        const secondUploadForm = document.getElementsByClassName('upload-video-details-form');
        if(!videoDropped) {
            firstUploadForm[0].classList.add('display-none');
            secondUploadForm[0].classList.add('display-flex');
            setVideoDropped(true);
        }
        if(videoDropped) {
            firstUploadForm[0].classList.remove('display-none');
            secondUploadForm[0].classList.remove('display-flex');
            setVideoDropped(false);
        }
    }

    function handleUpdateTitle(e) {
        setVideoTitle(e.target.value);
    }

    function handleUpdateDescription(e) {
        setVideoDescription(e.target.value);
    }

    function handleUpdateThumbnail(e) {
        setVideoThumbnail(e.target.value);
    }

    return (
        <div className='upload-video-page-container'>
            <div className='upload-video-page-top'>
                <div className='upload-video-page-top-inner'>
                    <span id='upload-video-page-top-text'>Upload videos</span>
                    <i className='fa-solid fa-x' id='upload-video-page-top-x'
                    onClick={() => setShowModal(false)}
                    />
                </div>
            </div>
                <div className='upload-video-page-body'>
                    <div className='upload-video-page-body-inner'>
                        <div className='upload-video-page-icon-wrapper'>
                            <i className='fa-solid fa-upload' id='upload-video-page-body-icon'/>
                        </div>
                        <span id='drag-and-drop'>Drag and drop video files to upload</span>
                        <span id='videos-private'>Your videos must be uploaded as .mp4 files</span>
                            <label htmlFor='file-upload' id='select-files-button'>
                            <input id='file-upload' type='file' accept="video/mp4,video/x-m4v,video/*"/>
                                SELECT FILES</label>
                    </div>
                    <div className='upload-video-page-bottom'>
                        <span id='dont-have-video'>Don't have a video? Download a demo video</span>
                        <span id='download-demo-here'>here</span>
                    </div>
                </div>
                <div className='upload-video-details-form'>
                    <div className='upload-video-details-form-inner'>
                        <div className='upload-video-details-form-left'>
                            <span id='upload-video-details-form-details-title'>Details</span>
                            <div className='upload-video-details-title-input'>
                                <span className='upload-video-details-input-labels'>Title</span>
                                <input
                                type='text'
                                id='upload-video-details-title-input-field'
                                placeholder='Please enter a title...'
                                value={videoTitle}
                                onChange={handleUpdateTitle}
                                ></input>
                            </div>
                            <div className='upload-video-details-description-input'>
                                <span className='upload-video-details-input-labels'>Description</span>
                                <textarea
                                type='text'
                                id='upload-video-details-description-textarea-field'
                                placeholder='Add a description...'
                                value={videoDescription}
                                onChange={handleUpdateDescription}
                                ></textarea>
                            </div>
                            <span id='upload-video-details-thumbnail-header'>Thumbnail</span>
                            <input
                            type='text'
                            id='upload-video-details-thumbnail-input-field'
                            value={videoThumbnail}
                            onChange={handleUpdateThumbnail}
                            placeholder='Add a thumbnail...'
                            ></input>
                        </div>
                        <div className='upload-video-details-form-footer'>
                            <div className='upload-video-details-form-footer-inner'>
                                <div id='upload-cancel-button'
                                onClick={() => handleVideoDropped()}
                                >Cancel</div>
                                <div id='upload-video-details-submit-button'>Upload</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UploadVideoModalPage;
