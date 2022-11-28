import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './RightVideoCards.css';
import { useDispatch, useSelector } from 'react-redux';

function RightVideoCards({video}) {
    const history = useHistory();
    const users = useSelector(state => state.session.allUsers);
    const user = users?.find(user => user.id == video.user_id);

    return (
        <div className='right-video-cards-card-container'
        onClick={() => {
            history.push(`/videos/${video.id}`);
            // history.go(0);
        }}
        >
            <img alt={video.title} src={video.thumbnail} id='right-video-cards-thumbnail'/>
            <div className='right-video-cards-details'>
                <span id='right-video-cards-title'>{video?.title}</span>
                <span id='right-video-cards-poster'>{user?.username}</span>
                <span id='right-video-cards-num-views'>{video?.num_views} {video.num_views !== 1 ? 'views' : 'view'}</span>
            </div>
        </div>
    )
}

export default RightVideoCards;
