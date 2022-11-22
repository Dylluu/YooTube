import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopNavigation.css';
import logo from '../../assets/logo.png';

function TopNavigation() {
    return (
        <div className='top-nav-container'>
            <div className='top-nav-inner-wrapper'>
                <div id='menu-hover'></div>
                <div className='menu-and-logo'>
                    <div className='menu-wrapper'>
                        <div id='menu-bars'></div>
                        <div id='menu-bars'></div>
                        <div id='menu-bars'></div>
                    </div>
                    <img alt='logo' src={logo} id='logo'/>
                </div>
                <NavLink to='/signup' className='signin-button'>
                    <div className='signin-button-inner'>
                        <i className="fa-regular fa-user" id='user-icon'/>
                        <span id='user-signin-text'>Sign in</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default TopNavigation;
