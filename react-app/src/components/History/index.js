import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './History.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultCards from '../SearchResultCards';
import { getUsersThunk } from '../../store/session';
import { getUserHistoryThunk, getVideosThunk } from '../../store/videos';

function History () {

    const dispatch = useDispatch();
    const history = useHistory();
    const watchedVideos = useSelector(state => state.videos.history?.watched_videos);
    const allVideos = useSelector(state => state.videos.allVideos?.videos);
    const watchedVideosArray = allVideos?.filter(video => watchedVideos?.includes(video.id));

    useEffect(async () => {
        await dispatch(getUsersThunk());
        await dispatch(getVideosThunk());
        await dispatch(getUserHistoryThunk());
    }, [dispatch])

    useEffect(() => {
        const homeButton = document.getElementById('left-nav-home');
        if(homeButton) homeButton.classList.add('your-channel-left-nav-home');
        const historyButton = document.getElementById('left-nav-history');
        if(historyButton) {
            historyButton.classList.add('history-current');
            historyButton.classList.remove('liked-videos-inactive');
        }
        const likedButton = document.getElementsByClassName('left-nav-current')[0];
        if(likedButton) likedButton.classList.add('liked-videos-inactive');
    }, [])

    if(!watchedVideos || !allVideos) return null;

    return (
        <div className='search-results-outer-container' id='history-container'>
            <div className='search-results-container'>
                <div className='search-results-inner-container'>
                    {watchedVideosArray.length > 0 && (
                        <div className='your-channel-user-videos-container' id='search-results-videos-container'>
                            {watchedVideosArray.reverse().map(vid => (
                                <SearchResultCards userVid={vid} />
                            ))}
                        </div>
                    )}
                    {watchedVideosArray.length == 0 && (
                        <span id='no-matches-found'>No videos watched</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default History;
