import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideoThunk, getUserVideosThunk, getVideosThunk } from '../../store/videos';

function YourVideosCards({ userVid }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

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
                    currentTarget.src = "https://assets.entrepreneur.com/content/3x2/2000/20180117155526-youtube.jpeg?crop=16:9";
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

                                ><i className="fa-solid fa-pen" id='comment-pen-icon' /> Edit</span>
                                <span id='delete-button'
                                onClick={async (e) => {
                                    e.stopPropagation()
                                    await dispatch(deleteVideoThunk(userVid.id))
                                    await dispatch(getUserVideosThunk())
                                    await dispatch(getVideosThunk())
                                }}
                                ><i className="fa-solid fa-trash" id='comment-trash-icon' /> Delete</span>
                            </div>
                        )}
                    </div>
                </span>
                <span id='your-channel-user-video-card-details-views'>2.2M views</span>
            </div>
        </div>

    )
}

export default YourVideosCards;
