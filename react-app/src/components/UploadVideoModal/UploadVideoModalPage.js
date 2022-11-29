import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UploadVideoModalPage.css';
import { useDispatch, useSelector } from 'react-redux';

function UploadVideoModalPage({setShowModal}) {



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
                        <span id='videos-private'>Your videos will be private until you publish them</span>
                            <label for='file-upload' id='select-files-button'>
                            <input id='file-upload' type='file'/>
                                SELECT FILES</label>
                    </div>
                    <div className='upload-video-page-bottom'>
                        <span id='dont-have-video'>Don't have a video? Download a demo video</span>
                        <span id='download-demo-here'>here</span>
                    </div>
                </div>
        </div>
    )
}

export default UploadVideoModalPage;
