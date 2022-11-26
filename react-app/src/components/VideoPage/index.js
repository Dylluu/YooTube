import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './VideoPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosThunk } from '../../store/videos';
import { getUsersThunk } from '../../store/session';
import { getCommentsThunk } from '../../store/comments';
import { postCommentThunk } from '../../store/comments';
import CommentCards from '../CommentCards';

function VideoPage () {

    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    const videos = useSelector(state => state.videos.allVideos.videos);
    const {videoId} = useParams();
    const video = videos?.find(video => video.id == videoId);
    const users = useSelector(state => state.session.allUsers);
    const videoPoster = users?.find(user => user.id == video.user_id);
    const comments = useSelector(state => state.comments.comments);
    const currUser = useSelector(state => state.session.user);
    // console.log(videoPoster, '----------')
    // console.log(video?.created_at)
    // console.log(new Date(video?.created_at), '--------')
    const date = new Date(video?.created_at);

    function getDate(date) {
        const split = `${date}`.split(' ');
        return `${split[1]} ${split[2]}, ${split[3]}`
    }

    useEffect(async () => {
        await dispatch(getVideosThunk());
        await dispatch(getUsersThunk());
        await dispatch(getCommentsThunk(videoId));
    }, [dispatch])

    const postComment = async (e) => {
        e.preventDefault()
        await dispatch(postCommentThunk(videoId, commentText))
        setCommentText('');
        await dispatch(getCommentsThunk(videoId))
    }

    const resetComment = async (e) => {
        e.preventDefault()
        setCommentText('')
    }

    const updateComment = (e) => {
        setCommentText(e.target.value)
    }

    if(!video) return null

    return (
        <div className='video-page-container'>
            <div className='video-page-inner-wrapper'>
            <div className='video-page-left-wrapper'>
            <video width='100%' height='auto' autoPlay controls id='video-box'>
                <source src={video?.url}/>
            </video>
            <div className='video-title'>{video?.title}</div>
            <div className='video-user-and-likes'>
                <div className='video-poster-info'>
                    {videoPoster?.profile_pic && <img alt={video?.user_id} src={videoPoster?.profile_pic} id='video-poster-profile-pic'/>}
                    {!videoPoster?.profile_pic && (<div id='video-poster-first-initial'>{videoPoster?.username[0]}</div>)}
                    <div className='video-poster-name-and-subscribers'>
                        <span id='video-poster-username'>{videoPoster?.username}</span>
                        <span id='video-poster-subscribers'>2.2M subscribers</span>
                    </div>
                </div>
                <div className='likes-and-dislikes'>
                    <div id='likes'>
                    <i className="fa-regular fa-thumbs-up" id='thumb-up-icon'/>
                    <span id='num-of-likes'>{video?.num_likes}</span>
                    </div>
                    <div id='likes-dislikes-spacer'></div>
                    <div id='dislikes'>
                    <i className="fa-regular fa-thumbs-down" id='thumb-down-icon'/>
                    </div>
                </div>
            </div>
            <div className='video-page-description'>
                <div className='video-page-description-inner-wrapper'>
                    <div id='video-description-header'>
                        <span id='video-description-header-num-views'>{video?.num_views} views</span>
                        <span id='video-description-header-date'>{getDate(date)}</span>
                    </div>
                    <p id='video-description'>{video?.description}</p>
                </div>
            </div>
            <div className='video-page-comments-top-div'>
                <span id='video-page-num-of-comments'>{comments?.length} {comments?.length !== 1 ? 'Comments' : 'Comment'}</span>
                {currUser && <div className='video-page-post-comment-form'>
                    {currUser.profile_pic && (
                        <img alt={currUser.username} src={currUser.profile_pic} id='video-poster-profile-pic'/>
                    )}
                    {!currUser.profile_pic && (
                        <div id='video-poster-first-initial'>{currUser.username[0]}</div>
                    )}
                    <div className='create-comment-input-div'>
                    <textarea className='create-comment-input-field' placeholder='Add a comment...' maxLength='255' value={commentText}
                    onChange={updateComment}
                    ></textarea>
                    {commentText.length > 0 && (
                        <div className='comment-submit-wrapper'>
                            <div id='comment-cancel-button'
                            onClick={resetComment}
                            >Cancel</div>
                            <div id='comment-submit-button'
                            onClick={postComment}
                            >Comment</div>
                        </div>
                    )}
                    </div>
                </div>}
                {comments.length > 0 && comments.map((comment) => (
                <CommentCards key={comment.id} comment={comment}/>
                ))}
            </div>
            </div>
            </div>
        </div>
    )
}

export default VideoPage;
