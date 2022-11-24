import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './VideoCards.css';
import { useDispatch, useSelector } from 'react-redux';

function VideoCards({video}) {

    const users = useSelector(state => state.session.allUsers);
    const videoUser = users?.find(user => user.id == video.user_id);
    // console.log(videoUser,'-----------')

    return (
        <div className='video-cards-container'>
            <div className='video-card-thumbnail'>
                <img alt={video?.title} src={video?.thumbnail} className='video-card-thumbnail-image'/>
            </div>
            <div className='video-card-info'>
                <div className='video-card-profile-pic'>
                    {videoUser?.profile_pic && <img alt={videoUser?.username} src={videoUser?.profile_pic} className='video-card-profile-pic-image'/>}
                    {!videoUser?.profile_pic && (
                        <span>{videoUser?.username[0]}</span>
                    )}
                </div>
                <div className='video-card-title-and-info'>
                    <div className='video-card-title'>{video?.title}</div>
                    <div className='video-card-poster'>
                        {videoUser?.username}
                    </div>
                    <div className='video-card-views-and-date'>
                        <span>{video?.num_views} views</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCards;
