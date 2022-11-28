import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './TopNavigation.css';
import logo from '../../assets/logo.png';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

function TopNavigation() {

    const user = useSelector(state => state.session.user);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    function handleAccountMenuOpen(e){
        e.stopPropagation()
        if(!accountMenuOpen) {
            setAccountMenuOpen(true);
            window.addEventListener('click', () => {
                setAccountMenuOpen(false);
            })
        }
        if(accountMenuOpen) {
            setAccountMenuOpen(false);
        }
    }

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
                    <NavLink to='/' id='logo-nav'>
                    <img alt='logo' src={logo} id='logo'/>
                    </NavLink>
                </div>
                {!user && <NavLink to='/login' className='signin-button'>
                    <div className='signin-button-inner'>
                        <i className="fa-regular fa-user" id='user-icon'/>
                        <span id='user-signin-text'>Sign in</span>
                    </div>
                </NavLink>}
                {user && (
                    <div className='top-nav-right-buttons'>
                        {/* <LogoutButton /> */}
                    <div className='top-nav-account-button'
                    onClick={(e) => handleAccountMenuOpen(e)}
                    >
                        {user.profile_pic && (
                            <img alt={user?.username} src={user.profile_pic} id='top-nav-user-profile-pic'/>
                        )}
                        {!user.profile_pic && (
                            <div id='top-nav-user-first-initial'>{user?.username[0]}</div>
                        )}
                        {accountMenuOpen && <div className='account-menu-popout'
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        >
                            <div className='account-menu-popout-top-div'>
                                <div className='account-menu-popout-top-inner-div'>
                                    {user.profile_pic && (
                                        <img alt={user?.username} src={user.profile_pic} id='account-menu-popout-profile-pic'/>
                                    )}
                                    {!user.profile_pic && (
                                        <div id='account-menu-popout-first-initial'>{user?.username[0]}</div>
                                    )}
                                    <div className='account-menu-popout-name-and-username'>
                                        <span id='account-menu-popout-name'>{user?.first_name} {user?.last_name}</span>
                                        <span id='account-menu-popout-username'>@{user?.username}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='account-menu-popout-buttons-div'></div>
                        </div>}
                    </div>
                    </div>
                    // <LogoutButton />
                )
                }
            </div>
        </div>
    )
}

export default TopNavigation;
