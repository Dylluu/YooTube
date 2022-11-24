import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './VideoCards.css';
import { useDispatch, useSelector } from 'react-redux';

function VideoCards({video}) {

    return (
        <div className='video-cards-container'>
            <div className='video-card-thumbnail'></div>
            <div className='video-card-info'>
                <div className='video-card-profile-pic'>D</div>
                <div className='video-card-title-and-info'>
                    <div className='video-card-title'>{video.title}</div>
                    <div className='video-card-poster'></div>
                    <div className='video-card-views-and-date'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCards;
