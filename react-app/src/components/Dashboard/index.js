import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosThunk } from '../../store/videos';
import { getUsersThunk } from '../../store/session';
import VideoCards from '../VideoCards';

function Dashboard() {

    const dispatch = useDispatch()
    const videos = useSelector(state => state.videos.allVideos.videos)

    useEffect(async () => {
        await dispatch(getVideosThunk())
        await dispatch(getUsersThunk())
    }, [dispatch])

    useEffect(() => {
        const likedVideosButton = document.getElementsByClassName('left-nav-current');
        if(likedVideosButton[0]) {
            likedVideosButton[0].setAttribute('id', 'left-nav-liked');
            likedVideosButton[0].classList.remove('left-nav-current');
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        const homeButton = document.getElementById('left-nav-home');
        if(homeButton) homeButton.classList.remove('your-channel-left-nav-home');
    }, [])

    return (
        <div className='dashboard-outer-container'>
        <div className='dashboard-container'>
            {videos?.map((video) => (
                <NavLink to={`/videos/${video.id}`}
                className='video-card-nav'
                >
                    <VideoCards video={video}/>
                </NavLink>
            ))}
        </div>
        </div>
    )
}

export default Dashboard;
