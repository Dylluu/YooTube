import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './LeftNavigation.css';
import { useSelector } from 'react-redux';

function LeftNavigation () {
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);

    return (
        <div className='left-navigation-container'>
            <div className='left-navigation-wrapper'>
                <div className='left-navigation-home-section'>
                    <div className='left-nav-home' id='left-nav-home'
                    onClick={() => history.push('/')}
                    >
                    <div className='left-nav-home-icons'>
                    <i className="fa-solid fa-house" id='nav-left-house-icon'/>
                    </div>
                    <div className='left-nav-home-headers'>Home</div>
                    </div>
                    <a href='https://github.com/Dylluu' target="_blank">
                    <div className='left-nav-home' id='left-nav-shorts'>
                    <div className='left-nav-home-icons'>
                    <i className="fa-brands fa-github" id='nav-left-github-icon'/>
                    </div>
                    <div className='left-nav-home-headers' id='left-nav-home-headers-thin'>GitHub</div>
                    </div></a>
                    <a href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/' target="_blank">
                    <div className='left-nav-home' id='left-nav-subs'>
                    <div className='left-nav-home-icons'>
                    <i className="fa-brands fa-linkedin" id='nav-left-linkedin-icon'/>
                    </div>
                    <div className='left-nav-home-headers' id='left-nav-home-headers-thin'>LinkedIn</div>
                    </div></a>
                </div>
                {currUser && (
                    <div className='left-nav-home' id='left-nav-liked'
                    onClick={() => history.push('/liked-videos')}
                    style={{marginTop: '12px'}}
                    >
                    <div className='left-nav-home-icons'>
                    <i className="fa-regular fa-thumbs-up" id='nav-left-house-icon'/>
                    </div>
                    <div className='left-nav-home-headers'>Liked Videos</div>
                    </div>)}
                </div>
        </div>
    )
}

export default LeftNavigation;
