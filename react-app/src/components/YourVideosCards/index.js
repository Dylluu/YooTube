import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideoThunk, getUserVideosThunk, getVideosThunk } from '../../store/videos';
import EditVideoModal from '../EditVideoModal';
import EditVideoModalPage from '../EditVideoModal/EditVideoModalPage';
import { Modal } from '../../context/Modal';

function YourVideosCards({ userVid }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    function handleMenuOpen() {
        if (!menuOpen) {
            setMenuOpen(true);
            window.addEventListener('click', () => {
                setMenuOpen(false);
            })
        }
        if (menuOpen) {
            setMenuOpen(false);
        }
    }

    return (
        <div className='your-channel-user-video-card' key={userVid.id}>
            <img alt={userVid.title} src={userVid.thumbnail} id='your-channel-user-video-card-thumbnail'
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg";
                }}
                onClick={() => history.push(`/videos/${userVid.id}`)}
            />
            <div className='your-channel-user-video-card-details'>
                <span id='your-channel-user-video-card-details-title'>{userVid.title}
                    <div>
                        <i className="fa-solid fa-ellipsis-vertical" id='comments-menu-dots'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleMenuOpen()
                            }}
                        />
                        {menuOpen && (
                            <div className='comments-menu-div'
                            >
                                <span id='edit-button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowEditModal(true)
                                        setMenuOpen(false)
                                    }}
                                >
                                    <i className="fa-solid fa-pen" id='comment-pen-icon' /> Edit

                                </span>
                                <span id='delete-button'
                                    onClick={async (e) => {
                                        e.stopPropagation()
                                        await dispatch(deleteVideoThunk(userVid.id))
                                        await dispatch(getUserVideosThunk())
                                        await dispatch(getVideosThunk())
                                        setMenuOpen(false);
                                    }}
                                ><i className="fa-solid fa-trash" id='comment-trash-icon' /> Delete</span>
                            </div>
                        )}
                        {showEditModal && (
                            <Modal onClose={() => setShowEditModal(false)}>
                                <EditVideoModalPage setShowEditModal={setShowEditModal} setMenuOpen={setMenuOpen} userVid={userVid}/>
                            </Modal>
                        )}
                    </div>
                </span>
                <span id='your-channel-user-video-card-details-views'>{userVid.num_views} views</span>
            </div>
        </div>

    )
}

export default YourVideosCards;
