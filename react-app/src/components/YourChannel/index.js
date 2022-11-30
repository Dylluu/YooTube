import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './YourChannel.css';
import { useDispatch, useSelector } from 'react-redux';

function YourChannel() {
    const user = useSelector(state => state.session.user);

    return (
        <div className='your-channel-container'>
            <div className='your-channel-inner-wrapper'>
                <div className='your-channel-header'>
                    {!user.profile_pic && (
                        <div id='your-channel-first-initial'>{user?.username[0]}</div>
                    )}
                    {user.profile_pic && (
                        <img alt={user.username} src={user.profile_pic} id='your-channel-profile-pic'/>
                    )}
                    <div className='your-channel-header-user-info'>
                        <span id='your-channel-header-user-first-last'>{user.first_name} {user.last_name}</span>
                        <span id='your-channel-header-user-username'>@{user.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourChannel;
