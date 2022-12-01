import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './LeftNavigation.css';
import { useSelector } from 'react-redux';

function LeftNavigation () {
    const history = useHistory();

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
                    <div className='left-nav-home-headers'>GitHub</div>
                    </div></a>
                    <a href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/' target="_blank">
                    <div className='left-nav-home' id='left-nav-subs'>
                    <div className='left-nav-home-icons'>
                    <i className="fa-brands fa-linkedin" id='nav-left-linkedin-icon'/>
                    </div>
                    <div className='left-nav-home-headers'>LinkedIn</div>
                    </div></a>
                </div>
            </div>
        </div>
    )
}

export default LeftNavigation;
