import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './LeftNavigation.css';
import { useSelector } from 'react-redux';

function LeftNavigation() {
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state.session.allUsers);

    return (
        <div className='left-navigation-container'>
            <div className='left-navigation-wrapper'>
                <div className='left-navigation-home-section'>
                    <div className='left-nav-home' id='left-nav-home'
                        onClick={() => history.push('/')}
                    >
                        <div className='left-nav-home-icons'>
                            <i className="fa-solid fa-house" id='nav-left-house-icon' />
                        </div>
                        <div className='left-nav-home-headers'>Home</div>
                    </div>
                    <a href='https://github.com/Dylluu' target="_blank">
                        <div className='left-nav-home' id='left-nav-shorts'>
                            <div className='left-nav-home-icons'>
                                <i className="fa-brands fa-github" id='nav-left-github-icon' />
                            </div>
                            <div className='left-nav-home-headers' id='left-nav-home-headers-thin'>GitHub</div>
                        </div></a>
                    <a href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/' target="_blank">
                        <div className='left-nav-home' id='left-nav-subs'>
                            <div className='left-nav-home-icons'>
                                <i className="fa-brands fa-linkedin" id='nav-left-linkedin-icon' />
                            </div>
                            <div className='left-nav-home-headers' id='left-nav-home-headers-thin'>LinkedIn</div>
                        </div></a>
                </div>
                {currUser && (
                    <div className='left-nav-liked-wrapper'>
                        <div className='left-nav-home' id='left-nav-liked'
                            onClick={() => history.push('/liked-videos')}
                            style={{ marginTop: '12px' }}
                        >
                            <div className='left-nav-home-icons'>
                                <i className="fa-regular fa-thumbs-up" id='nav-left-house-icon' />
                            </div>
                            <div className='left-nav-home-headers'>Liked Videos</div>
                        </div>
                        <div className='left-nav-home' id='left-nav-history'
                        onClick={() => history.push('/history')}
                        >
                            <div className='left-nav-home-icons'>
                                <i className="fa-solid fa-clock-rotate-left" id='nav-left-house-icon' />
                            </div>
                            <div className='left-nav-home-headers'>History</div>
                        </div>
                    </div>
                )}
                <div className='explore-channels-container'>
                    <div className='explore-channels-wrapper'>
                        <span id='explore'>Explore</span>
                        {allUsers && allUsers.map(user => (
                            <NavLink to={`/channels/${user.username}`} className='left-nav-home' id='left-nav-shorts'>
                            <div className='left-nav-home-icons'>
                                {user.profile_pic && <img alt={user.username} src={user.profile_pic} className="explore-user-profile-pic"/>}
                                {!user.profile_pic && <div className='explore-user-no-profile-pic'>{user.username[0]}</div>}
                            </div>
                            <div className='left-nav-home-headers' id='explore-user-headers'>{user.username}</div>
                        </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftNavigation;
