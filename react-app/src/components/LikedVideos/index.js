import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './LikedVideos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLikesThunk, getUsersThunk } from '../../store/session';
import SearchResultCards from '../SearchResultCards';

function LikedVideos() {
    const dispatch = useDispatch();
    const likedVideos = useSelector(state => state.session.allLikes?.all_user_video_likes);

    useEffect(async () => {
        await dispatch(getUsersThunk());
        await dispatch(getLikesThunk());
    }, [dispatch])

    useEffect(() => {
        const homeButton = document.getElementById('left-nav-home');
        if(homeButton) homeButton.classList.add('your-channel-left-nav-home');
        const likedVideosButton = document.getElementById('left-nav-liked');
        console.log(likedVideosButton);
        if(likedVideosButton) {
            likedVideosButton.classList.add('left-nav-current');
            likedVideosButton.removeAttribute('id');
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if(!likedVideos) return <div className='search-results-outer-container'></div>;

    return (
        <div className='search-results-outer-container'>
            <div className='search-results-container'>
                <div className='search-results-inner-container'>
                    {likedVideos.length > 0 && (
                        <div className='your-channel-user-videos-container' id='search-results-videos-container'>
                            {likedVideos.map(vid => (
                                <SearchResultCards userVid={vid} />
                            ))}
                        </div>
                    )}
                    {likedVideos.length == 0 && (
                        <span id='no-matches-found'>No liked videos</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LikedVideos;
