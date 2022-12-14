import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './TopNavigation.css';
import logo from '../../assets/logo.png';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import UploadVideoModal from '../UploadVideoModal';
import crossCircle from '../../assets/circleCross.png';

function TopNavigation() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector(state => state.session.user);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

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

    const onLogout = async (e) => {
        await dispatch(logout());
      };

    function handleSearch(e) {
        e.preventDefault();
        if(search.length) {
            history.push(`/search/${search}`);
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
                    <img alt='crossCircle' src={crossCircle} id='crossCircle'/>
                    </NavLink>
                </div>
                <form className='search-bar-container'
                onSubmit={handleSearch}
                >
                    <div className='search-bar-input-div'>
                        <input className='search-bar-input'
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        ></input>
                    </div>
                    <button type='submit' className='search-bar-search-button'>
                        <i className='fa-solid fa-magnifying-glass' id='search-bar-search-button-icon'/>
                    </button>
                </form>
                {!user && <NavLink to='/login' className='signin-button'>
                    <div className='signin-button-inner'>
                        <i className="fa-regular fa-user" id='user-icon'/>
                        <span id='user-signin-text'>Sign in</span>
                    </div>
                </NavLink>}
                {user && (
                    <div className='top-nav-right-buttons'>
                        {/* <LogoutButton /> */}
                        <UploadVideoModal />
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
                                        {/* <span id='manage-your-account'>Manage Your Account</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className='account-menu-popout-buttons-div'>
                                <NavLink to='/channel' className='account-menu-popout-button'
                                onClick={handleAccountMenuOpen}
                                >
                                    <div className='account-menu-popout-button-inner'>
                                        <div className='account-menut-popout-button-inner-icon'>
                                        <i className="fa-solid fa-user" id='account-menu-popout-button-icon'/>
                                        </div>
                                        <span className='account-menu-popout-button-text'>Your Channel</span>
                                    </div>
                                </NavLink>
                                <NavLink to='/' className='account-menu-popout-button'
                                onClick={onLogout}
                                >
                                    <div className='account-menu-popout-button-inner'>
                                        <div className='account-menut-popout-button-inner-icon'>
                                        <i className="fa-solid fa-arrow-right-from-bracket" id='account-menu-popout-button-icon'/>
                                        </div>
                                        <span className='account-menu-popout-button-text2'>Sign Out</span>
                                    </div>
                                </NavLink>
                            </div>
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
