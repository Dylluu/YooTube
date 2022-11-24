import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './VideoPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosThunk } from '../../store/videos';

function VideoPage () {

    const dispatch = useDispatch()
    const videos = useSelector(state => state.videos.allVideos)
    const {videoId} = useParams()
    const video = videos?.find(video => video.id == videoId)
    console.log(video)

    useEffect(async () => {
        await dispatch(getVideosThunk())
    }, [dispatch])

    return (
        <div className='video-page-container'>
            <video width='100%' height='590' controls id='video-box'>
                <source src={video.url}/>
            </video>
        </div>
    )
}

export default VideoPage;
