import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './EditVideoModalPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { editVideoThunk, getUserVideosThunk, getVideosThunk } from '../../store/videos';

function EditVideoModalPage({setShowEditModal, setMenuOpen, userVid}) {
    const dispatch = useDispatch();
    const [updatedTitle, setUpdatedTitle] = useState(userVid.title);
    const [updatedDescription, setUpdatedDescription] = useState(userVid.description);
    const [updatedThumbnail, setUpdatedThumbnail] = useState(userVid.thumbnail);
    const [titleErrors, setTitleErrors] = useState('');
    const [descriptionErrors, setDescriptionErrors] = useState('');
    const [thumbnailErrors, setThumbnailErrors] = useState('');

    async function handleEditSubmit(e) {
        e.stopPropagation()
        setTitleErrors('');
        setDescriptionErrors('');
        setThumbnailErrors('');

        if(updatedTitle.length && updatedDescription.length && updatedThumbnail.length && (updatedThumbnail.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            const newVid = {
                id: userVid.id,
                title: updatedTitle,
                description: updatedDescription,
                thumbnail: updatedThumbnail
            }

            await dispatch(editVideoThunk(newVid));
            await dispatch(getUserVideosThunk());
            await dispatch(getVideosThunk());
            setShowEditModal(false);
        }
        if(!updatedTitle.length) {
            setTitleErrors('Please enter a title');
        }
        if(!updatedDescription.length) {
            setDescriptionErrors('Please enter a description')
        }
        if(!updatedThumbnail.length) {
            setThumbnailErrors('Please provide a thumbnail')
        }
        if(updatedThumbnail.length && (updatedThumbnail.match(/\.(jpeg|jpg|png)$/) === null)) {
            setThumbnailErrors('Please provide an image of type .jpeg, .jpg, or .png')
        }
    }

    return (
        <div className='upload-video-page-container'>
            <div className='upload-video-page-top'>
                <div className='upload-video-page-top-inner'>
                    <span id='upload-video-page-top-text'>Edit video details</span>
                    <i className='fa-solid fa-x' id='upload-video-page-top-x'
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowEditModal(false)
                        setMenuOpen(false)
                    }}
                    />
                </div>
            </div>
                    <div className='upload-video-details-form' id='edit-video-details-form'>
                        <div className='upload-video-details-form-inner'>
                            <div className='upload-video-details-form-left'>
                                <span id='upload-video-details-form-details-title'>Details</span>
                                <div className='upload-video-details-title-input'>
                                <span className='upload-video-details-input-labels'>Title</span>
                                <input
                                type='text'
                                id='upload-video-details-title-input-field'
                                name='title'
                                maxLength='70'
                                value={updatedTitle}
                                autoFocus
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                ></input>
                                {updatedTitle.length > 0 && <span className='upload-video-form-character-count' id='title-cc'>characters: {updatedTitle.length}/70</span>}
                                </div>
                                {titleErrors && <span className='upload-form-title-errors'>
                                <i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{titleErrors}</span>}
                                <div className='upload-video-details-description-input'>
                                <span className='upload-video-details-input-labels'>Description</span>
                                <textarea
                                type='text'
                                id='upload-video-details-description-textarea-field'
                                // placeholder='Add a description...'
                                value={updatedDescription}
                                name='description'
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                maxLength='255'
                                ></textarea>
                                {updatedDescription.length > 0 && <span className='upload-video-form-character-count' id='description-cc'>characters: {updatedDescription.length}/255</span>}
                                </div>
                                {descriptionErrors && <span className='upload-form-title-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{descriptionErrors}</span>}
                                <span id='upload-video-details-thumbnail-header'>Thumbnail URL</span>
                                <input
                                type='text'
                                id='upload-video-details-thumbnail-input-field'
                                value={updatedThumbnail}
                                name='thumbnail'
                                maxLength='255'
                                onChange={(e) => setUpdatedThumbnail(e.target.value)}
                            ></input>
                                <div id='thumbnail-cc-and-errors'>
                                {!thumbnailErrors && <div></div>}
                                {thumbnailErrors && <span
                                id='edit-thumbnail-errors'
                                className='upload-form-thumbnail-errors'>
                                    <i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{thumbnailErrors}</span>}
                                {updatedThumbnail.length > 0 && (
                                <span className='upload-video-form-character-count' id='thumbnail-cc'>characters: {updatedThumbnail.length}/255</span>
                                )}
                                </div>
                            </div>
                            <div className='upload-video-details-form-footer'>
                            <div className='upload-video-details-form-footer-inner'>
                                <div id='upload-cancel-button'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowEditModal(false)
                                }}
                                >Cancel</div>
                                <div id='upload-video-details-submit-button'
                                onClick={handleEditSubmit}
                                ><span id='upload-video-details-submit-inner-text'>Save</span></div>
                            </div>
                        </div>
                        </div>
                    </div>
        </div>
    )
}

export default EditVideoModalPage;
