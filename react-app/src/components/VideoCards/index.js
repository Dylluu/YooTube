import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './VideoCards.css';
import { useDispatch, useSelector } from 'react-redux';

function VideoCards({video}) {

    const users = useSelector(state => state.session.allUsers);
    const videoUser = users?.find(user => user.id == video.user_id);

    if(!videoUser) return null;

    return (
        <div className='video-cards-container'>
            <div className='video-card-thumbnail'>
                <img alt={video?.title} src={video?.thumbnail} className='video-card-thumbnail-image' onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg";
                }}/>
            </div>
            <div className='video-card-info'>
                    {videoUser?.profile_pic && (
                    <NavLink to={`/channels/${videoUser?.username}`} className='video-card-profile-pic'>
                    <img alt={videoUser?.username} src={videoUser?.profile_pic} className='video-card-profile-pic-image'/>
                    </NavLink>)}
                    {!videoUser?.profile_pic && (
                        <NavLink to={`/channels/${videoUser?.username}`} className='video-card-profile-pic'>
                        <span>{videoUser?.username[0]}</span>
                        </NavLink>
                    )}
                <div className='video-card-title-and-info'>
                    <div className='video-card-title'>{video?.title}</div>
                    <NavLink to={`/channels/${videoUser?.username}`} className='video-card-poster'>
                        {videoUser?.username}
                    </NavLink>
                    <div className='video-card-views-and-date'>
                        <span>{video?.num_views} {video?.num_views == 1 ? 'view' : 'views'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCards;
