import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosThunk } from '../../store/videos';
import VideoCards from '../VideoCards';

function Dashboard() {

    const dispatch = useDispatch()
    const videos = useSelector(state => state.videos.allVideos.videos)

    useEffect(async () => {
        await dispatch(getVideosThunk())
    }, [dispatch])

    return (
        <div className='dashboard-container'>
            {videos?.map((video) => (
                <NavLink to={`/videos/${video.id}`}>
                    <VideoCards video={video}/>
                </NavLink>
            ))}
        </div>
    )
}

export default Dashboard;
