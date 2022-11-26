import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CommentCards.css';
import { useDispatch, useSelector } from 'react-redux';

function CommentCards ({comment}) {

    const users = useSelector(state => state.session.allUsers);
    // console.log(users, '------')
    const commentor = users?.find(user => user.id == comment.user_id);

    return (
        <div key={comment?.id} className='comment-cards'>
            {commentor?.profile_pic && (
                <img alt={commentor?.username} src={commentor?.profile_pic} id='video-poster-profile-pic'/>
            )}
            {!commentor?.profile_pic && (
                <div id='video-poster-first-initial'>{commentor?.username[0]}</div>
            )}
            <div className='comment-content-div'>
                <div className='comment-content-header'>
                    <span id='comment-content-header-poster'>{commentor?.username}</span>
                </div>
                <p className='comment-comment-div'>{comment.comment}</p>
            <div className='comments-likes-dislikes'>
            <i className="fa-regular fa-thumbs-up" id='comments-thumb-up-icon'/>
            <span id='comments-num-likes'>{comment?.num_likes}</span>
            <i className="fa-regular fa-thumbs-down" id='comments-thumb-down-icon'/>
            </div>
            </div>
        </div>
    )
}

export default CommentCards;
