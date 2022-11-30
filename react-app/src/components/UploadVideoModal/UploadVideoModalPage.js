import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './UploadVideoModalPage.css';
import { useDispatch, useSelector } from 'react-redux';

function UploadVideoModalPage({setShowModal}) {
    const history = useHistory();
    const [video, setVideo] = useState(null);
    const [videoDropped, setVideoDropped] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Videos');
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        const videoUpload = document.getElementById('file-upload');
        videoUpload.addEventListener('change', async (e) => {
            e.preventDefault();
            const vid = videoUpload.files[0];
            setTitle(vid?.name);
            handleVideoDropped();
        })
    }, [])

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById('form');
        const formData = new FormData(form);
        // formData.append('title', title)
        // formData.append('description', description)
        // formData.append('category', category)
        // formData.append('thumbnail', thumbnail)
        formData.append("video", video);
        // console.log(video)
        // console.log(formData)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // setImageLoading(true);

        const res = await fetch('/api/videos', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            await res.json();
            // setImageLoading(false);
            history.push("/");
        }
        else {
            // setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            // console.log("error");
            console.log(res)
        }
    }

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
        setTitle(e.target.value);
    }

    function handleUpdateDescription(e) {
        setDescription(e.target.value);
    }

    function handleUpdateThumbnail(e) {
        setThumbnail(e.target.value);
    }

    return (
        <form className='upload-video-page-container' id='form'>
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
                            <input id='file-upload' type='file' accept="video/mp4,video/x-m4v,video/*"
                            onChange={updateVideo}
                            encType="multipart/form-data"
                            />
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
                                value={title}
                                name='title'
                                onChange={handleUpdateTitle}
                                ></input>
                            </div>
                            <div className='upload-video-details-description-input'>
                                <span className='upload-video-details-input-labels'>Description</span>
                                <textarea
                                type='text'
                                id='upload-video-details-description-textarea-field'
                                placeholder='Add a description...'
                                value={description}
                                name='description'
                                onChange={handleUpdateDescription}
                                ></textarea>
                            </div>
                            <span id='upload-video-details-thumbnail-header'>Thumbnail</span>
                            <input
                            type='text'
                            id='upload-video-details-thumbnail-input-field'
                            value={thumbnail}
                            name='thumbnail'
                            onChange={handleUpdateThumbnail}
                            placeholder='Add a thumbnail...'
                            ></input>
                        </div>
                        <div className='upload-video-details-form-footer'>
                            <div className='upload-video-details-form-footer-inner'>
                                <div id='upload-cancel-button'
                                onClick={() => handleVideoDropped()}
                                >Cancel</div>
                                <div id='upload-video-details-submit-button'
                                onClick={handleSubmit}
                                >Upload</div>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
    )
}

export default UploadVideoModalPage;
