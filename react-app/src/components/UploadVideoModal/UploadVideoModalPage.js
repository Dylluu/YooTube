import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './UploadVideoModalPage.css';
import { useDispatch, useSelector } from 'react-redux';
import loadingCircle from '../../assets/loadingCircle.gif';
import { getVideosThunk } from '../../store/videos';

function UploadVideoModalPage({setShowModal}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [video, setVideo] = useState(null);
    const [videoDropped, setVideoDropped] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Videos');
    const [thumbnail, setThumbnail] = useState('');
    const [titleErrors, setTitleErrors] = useState('');
    const [descriptionErrors, setDescriptionErrors] = useState('');
    const [thumbnailErrors, setThumbnailErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const videoUpload = document.getElementById('file-upload');
        videoUpload.addEventListener('change', async (e) => {
            e.preventDefault();
            const vid = videoUpload.files[0];
            // setTitle(vid?.name);
            handleVideoDropped();
        })
    }, [])

    useEffect(() => {
        const uploadButtonText = document.getElementById('upload-video-details-submit-inner-text');
        const loadingAnimation = document.getElementById('loading');
        if(isLoading) {
            uploadButtonText.classList.add('display-none');
            loadingAnimation.classList.remove('display-none');
            loadingAnimation.classList.add('display-flex')
        } else {
            uploadButtonText.classList.remove('display-none');
            loadingAnimation.classList.remove('display-flex');
            loadingAnimation.classList.add('display-none');
        }
    }, [isLoading])

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }

    const handleSubmit = async (e) => {
        setTitleErrors('');
        setDescriptionErrors('');
        setThumbnailErrors('');
        if(title.length && description.length && thumbnail.length && (thumbnail.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            e.preventDefault();
            setIsLoading(true);
            const form = document.getElementById('form');
            const formData = new FormData(form);
            formData.append("video", video);

            const res = await fetch('/api/videos', {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                await res.json();
                await dispatch(getVideosThunk());
                setShowModal(false);
                history.push('/')
                // history.go(0);
            }
            else {
                setIsLoading(false);
                console.log(res)
            }
        }
        if(!title.length) {
            setTitleErrors('Please enter a title');
        }
        if(!description.length) {
            setDescriptionErrors('Please enter a description')
        }
        if(!thumbnail.length) {
            setThumbnailErrors('Please provide a thumbnail');
        }
        if(thumbnail.length && (thumbnail.match(/\.(jpeg|jpg|png)$/) === null)) {
            setThumbnailErrors('Please provide an image of type .jpeg, .jpg, or .png')
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

    function handleCancel(e) {
        e.stopPropagation();
        setShowModal(false);
    }

    return (
        <form className='upload-video-page-container' id='form'>
            <div className='upload-video-page-top'>
                <div className='upload-video-page-top-inner'>
                    <span id='upload-video-page-top-text'>Upload videos</span>
                    <i className='fa-solid fa-x' id='upload-video-page-top-x'
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowModal(false)}}
                    />
                </div>
            </div>
                <div className='upload-video-page-body'>
                    <div className='upload-video-page-body-inner'>
                        <div className='upload-video-page-icon-wrapper'>
                            <i className='fa-solid fa-upload' id='upload-video-page-body-icon'/>
                        </div>
                        <span id='drag-and-drop'>Select video file to upload</span>
                        <span id='videos-private'>Your video must be uploaded as an .mp4 file</span>
                            <label htmlFor='file-upload' id='select-files-button'>
                            <input id='file-upload' type='file' accept="video/mp4,video/x-m4v,video/*"
                            onChange={updateVideo}
                            encType="multipart/form-data"
                            />
                                SELECT FILES</label>
                    </div>
                    <div className='upload-video-page-bottom'>
                        <span id='dont-have-video'>Don't have a video? Download a demo video</span>
                        <a href='https://yootubetest.s3.us-east-1.amazonaws.com/YooTubeDemo.mp4?response-content-disposition=attachment&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLWVhc3QtMSJGMEQCIEcfHiAp6ICml7NwRKryP67pwukvri1Bmuhzuq%2FMP9SIAiBodJzqrXvoqXcB7XTlMIH0ZcUiReFmq%2F7ZI7jJD97szSrtAgiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDcwNzA3NDY1NTY4NyIMoNaGzxiXnv4jA14pKsECZtD1jRSyOwBXi0NxJQK0jYykX2usapk3E05Tt0UEdFzKqhA3rBlbkswYVU%2BV5ZZc%2BYG5iHdLT66ieDmlBXcYFWCNR1qRAuR6pm2CW8c8glVfBMo6YCOcLQ2iGLM329cWFENgyHUjril9%2FoboDA3Fr1HJ%2FbXFKlSkvGOlJ2TGnGpN%2Fd8oMHzdTcV39tAwA0cGStP2Knjr5%2Bl%2FmHUzbVEwHyp9wFuPTYrzWtA9maRP9oJRiGX7bbL2J0q9Aifdd1pR2dF0e1UeMqXZnPLhnSGDAmBE%2BQ3FJqx57he1fwAwtb5asAjlhElXz5V1EmZ%2BAWBsDdJN6tlY%2FEvotc4vR7KV6C4MgvxXrolHEJz%2FRfUG104dnCD9EL%2Beya3CzEOeh2uYxvgZg0%2FFeYYNL%2FQfh1dSgFinbCJO9sLOuPh5TL7NGfFfMOjNn5wGOrQC%2Bl6CHc8JRd8OzLDx1mpEHYGARIPX4D32liKQsgQpr7kvXjNHMjEFFVNaOYZeCawb%2Be7PqAwRAtzOfUN8SvJeHo283s3UIp%2FlZ7Z%2BkLLifW%2FN%2B2CS6r7Kgu18LiJaecDus2WmsuwVMospZI8xXLzYoWjXKVzCkHZPjZr9mWt0IG96U%2BogpUXJVmsbt4MGdewOcrU8y%2F24k63DyylHbiYzgp6G2fSDTOsMcYH4wtuUCxjuXCBy80N0B%2FF5p3V%2FB%2BnOUtyiWbUNhBc5qjTVfP2znEmQEoPHmJIAVRRdFTFtNE4LHwMKspxfDZlkrJkD%2BkkiD6X8jIQ%2FH1sch%2Btuh8dGFR%2FYv2hLfKettV5%2FwwT0A1Wuv%2FGU21IDyg4krUJ4q%2Fmkg%2FS15yfg5hWQplgnYYJqKZgieL4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221201T051409Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2JIHPAXDXF4H4FCP%2F20221201%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b95753a9f78b80ed15f4c9ccc78f39906aab4ab221333a68eff025ab8c3a652a'><span id='download-demo-here'>here</span></a>
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
                                // placeholder='Please enter a title...'
                                value={title}
                                name='title'
                                onChange={handleUpdateTitle}
                                maxLength='70'
                                ></input>
                                {title.length > 0 && <span className='upload-video-form-character-count' id='title-cc'>characters: {title.length}/70</span>}
                            </div>
                                {titleErrors && <span className='upload-form-title-errors'>
                                <i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{titleErrors}</span>}
                            <div className='upload-video-details-description-input'>
                                <span className='upload-video-details-input-labels'>Description</span>
                                <textarea
                                type='text'
                                id='upload-video-details-description-textarea-field'
                                // placeholder='Add a description...'
                                value={description}
                                name='description'
                                onChange={handleUpdateDescription}
                                maxLength='255'
                                ></textarea>
                                {description.length > 0 && <span className='upload-video-form-character-count' id='description-cc'>characters: {description.length}/255</span>}
                            </div>
                                {descriptionErrors && <span className='upload-form-title-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{descriptionErrors}</span>}
                            <span id='upload-video-details-thumbnail-header'>Thumbnail URL</span>
                            <input
                            type='text'
                            id='upload-video-details-thumbnail-input-field'
                            value={thumbnail}
                            name='thumbnail'
                            onChange={handleUpdateThumbnail}
                            maxLength='255'
                            // placeholder='Add a thumbnail...'
                            ></input>
                            <div id='thumbnail-cc-and-errors'>
                                {!thumbnailErrors && <div></div>}
                                {thumbnailErrors && <span className='upload-form-thumbnail-errors'>
                                <i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{thumbnailErrors}</span>}
                                {thumbnail.length > 0 && (
                                    <span className='upload-video-form-character-count' id='thumbnail-cc'>characters: {thumbnail.length}/255</span>
                                )}
                                </div>
                        </div>
                        <div className='upload-video-details-form-footer'>
                            <div className='upload-video-details-form-footer-inner'>
                                <div id='upload-cancel-button'
                                onClick={handleCancel}
                                >Cancel</div>
                                <div id='upload-video-details-submit-button'
                                onClick={handleSubmit}
                                ><span id='upload-video-details-submit-inner-text'>Upload</span><img
								alt="loading"
								id="loading"
								className="display-none"
								src={loadingCircle}
							/></div>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
    )
}

export default UploadVideoModalPage;
