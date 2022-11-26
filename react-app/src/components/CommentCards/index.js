import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CommentCards.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';
import { getCommentsThunk } from '../../store/comments';

function CommentCards ({comment}) {

    const currUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.session.allUsers);
    const {videoId} = useParams()
    // console.log(users, '------')
    const commentor = users?.find(user => user.id == comment.user_id);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();

    function handleMenuOpen() {
        if(!menuOpen) {
            setMenuOpen(true);
            window.addEventListener('click', () => {
                setMenuOpen(false);
            })
        }
        if(menuOpen) {
            setMenuOpen(false);
        }
    }

    async function handleDeleteComment(e) {
        e.stopPropagation()
        await dispatch(deleteCommentThunk(comment.id));
        await dispatch(getCommentsThunk(videoId));
        // setMenuOpen(false);
    }

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
                    <span id='comment-content-header-poster'>{commentor?.username}
                    {currUser.id == comment.user_id && (
                    <div>
                    <i className="fa-solid fa-ellipsis-vertical" id='comments-menu-dots'
                    onClick={(e) => {
                        e.stopPropagation()
                        handleMenuOpen()}}
                    />
                    {menuOpen && (
                        <div className='comments-menu-div'
                        onClick={(e) => {handleDeleteComment(e)}}
                        >
                            <span id='delete-button'><i className="fa-solid fa-trash" id='comment-trash-icon'/> Delete Comment</span>
                        </div>
                    )}
                    </div>)}
                    </span>
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
