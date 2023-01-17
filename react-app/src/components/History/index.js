import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './History.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultCards from '../SearchResultCards';
import { getUsersThunk } from '../../store/session';
import { getVideosThunk } from '../../store/videos';

function History () {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUsersThunk());
        dispatch(getVideosThunk());
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

    return (
        <div className='search-results-outer-container' id='history-container'>
            <div className='search-results-container'>
                <div className='search-results-inner-container'>

                </div>
            </div>
        </div>
    )
}

export default History;
