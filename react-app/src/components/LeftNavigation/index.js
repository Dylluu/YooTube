import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftNavigation.css';
import { useSelector } from 'react-redux';

function LeftNavigation () {
    return (
        <div className='left-navigation-container'>
            <div className='left-navigation-wrapper'>
                <div className='left-navigation-home-section'>
                    <div className='left-nav-home' id='left-nav-home'>
                    <div className='left-nav-home-icons'>
                    <i className="fa-solid fa-house" id='nav-left-house-icon'/>
                    </div>
                    <div className='left-nav-home-headers'>Home</div>
                    </div>
                    <div className='left-nav-home' id='left-nav-shorts'></div>
                    <div className='left-nav-home' id='left-nav-subs'></div>
                </div>
            </div>
        </div>
    )
}

export default LeftNavigation;
