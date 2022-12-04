import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './YourChannel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserVideosThunk } from '../../store/videos';
import YourVideosCards from '../YourVideosCards';

function YourChannel() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userVideos = useSelector(state => state.videos.userVideos.user_videos);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const homeButton = document.getElementById('left-nav-home');
        if(homeButton) homeButton.classList.add('your-channel-left-nav-home');
    }, [])

    useEffect(async () => {
        await dispatch(getUserVideosThunk());
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if (!userVideos) return <div className='empty-container'></div>;

    return (
        <div className='your-channel-container'>
            <div className='your-channel-inner-wrapper'>
                <div className='your-channel-header'>
                    {!user.profile_pic && (
                        <div id='your-channel-first-initial'>{user?.username[0]}</div>
                    )}
                    {user.profile_pic && (
                        <img alt={user.username} src={user.profile_pic} id='your-channel-profile-pic' />
                    )}
                    <div className='your-channel-header-user-info'>
                        <span id='your-channel-header-user-first-last'>{user.first_name} {user.last_name}</span>
                        <span id='your-channel-header-user-username'>@{user.username}</span>
                    </div>
                </div>
                <div className='your-channel-page-bar'>
                    <span id='your-channel-page-bar-videos'>HOME</span>
                </div>
                <div className='your-channel-page-main-wrapper'>
                    {userVideos.length == 0 && <span id='no-videos-yet'>No videos yet</span>}
                    {userVideos.length > 0 && (
                        <div className='your-channel-user-videos-container'>
                            {userVideos.map(userVid => (
                                <YourVideosCards userVid={userVid}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default YourChannel;
