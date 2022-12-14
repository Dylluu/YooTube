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
            window.scrollTo(0, 0)
            // history.go(0);
        }}
        >
            <img alt={video.title} src={video.thumbnail} id='right-video-cards-thumbnail'
            onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg";
              }}
            />
            <div className='right-video-cards-details'>
                <span id='right-video-cards-title'>{video?.title}</span>
                <span id='right-video-cards-poster'>{user?.username}</span>
                <span id='right-video-cards-num-views'>{video?.num_views} {video.num_views !== 1 ? 'views' : 'view'}</span>
            </div>
        </div>
    )
}

export default RightVideoCards;
