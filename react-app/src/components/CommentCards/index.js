import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CommentCards.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentThunk, editCommentsThunk } from '../../store/comments';
import { getCommentsThunk } from '../../store/comments';

function CommentCards({ comment }) {

    const currUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.session.allUsers);
    const { videoId } = useParams()
    const commentor = users?.find(user => user.id == comment.user_id);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [ogComment, setOgComment] = useState(comment.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        const saveButton = document.getElementById('edit-submit-button');
        if(editedComment === ogComment) {
            saveButton?.classList.remove('enabled-save');
        }
    }, [editedComment])

    function handleMenuOpen() {
        if (!menuOpen) {
            setMenuOpen(true);
            window.addEventListener('click', () => {
                setMenuOpen(false);
            })
        }
        if (menuOpen) {
            setMenuOpen(false);
        }
    }

    function handleEditOpen() {
        setEditOpen(true);
    }

    async function handleDeleteComment(e) {
        e.stopPropagation()
        await dispatch(deleteCommentThunk(comment.id));
        await dispatch(getCommentsThunk(videoId));
    }

    function updateEditedComment(e) {
        setEditedComment(e.target.value);
        const saveButton = document.getElementById('edit-submit-button');
        saveButton?.classList.add('enabled-save');
    }

    function cancelEditComment() {
        setEditOpen(false);
        setEditedComment(comment.comment);
    }

    async function handleEditComment(e) {
        if (editedComment !== ogComment) {
            const newComment = {
                id: comment.id,
                comment: editedComment
            }
            e.stopPropagation()
            await dispatch(editCommentsThunk(newComment));
            await dispatch(getCommentsThunk(videoId));
            setEditOpen(false);
            setOgComment(editedComment);
        }
    }

    return (
        <div key={comment?.id} className='comment-cards'>
            {commentor?.profile_pic && (
                <img alt={commentor?.username} src={commentor?.profile_pic} id='video-poster-profile-pic' />
            )}
            {!commentor?.profile_pic && (
                <div id='video-poster-first-initial'>{commentor?.username[0]}</div>
            )}
            {!editOpen && <div className='comment-content-div'>
                <div className='comment-content-header'>
                    <span id='comment-content-header-poster'>{commentor?.username}
                        {currUser?.id == comment?.user_id && (
                            <div>
                                <i className="fa-solid fa-ellipsis-vertical" id='comments-menu-dots'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleMenuOpen()
                                    }}
                                />
                                {menuOpen && (
                                    <div className='comments-menu-div'
                                    >
                                        <span id='edit-button'
                                            onClick={() => handleEditOpen()}
                                        ><i className="fa-solid fa-pen" id='comment-pen-icon' /> Edit</span>
                                        <span id='delete-button'
                                            onClick={(e) => { handleDeleteComment(e) }}
                                        ><i className="fa-solid fa-trash" id='comment-trash-icon' /> Delete</span>
                                    </div>
                                )}
                            </div>)}
                    </span>
                </div>
                <p className='comment-comment-div'>{comment.comment}</p>
                <div className='comments-likes-dislikes'>
                    <i className="fa-regular fa-thumbs-up" id='comments-thumb-up-icon' />
                    <span id='comments-num-likes'>{comment?.num_likes}</span>
                    <i className="fa-regular fa-thumbs-down" id='comments-thumb-down-icon' />
                </div>
            </div>}
            {editOpen && <div className='create-comment-input-div'>
                <textarea className='create-comment-input-field' id='edit-comment-input-field' autoFocus maxLength='255' value={editedComment} onChange={updateEditedComment}
                onFocus={function(e) {
                    var val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                  }}
                ></textarea>
                {(
                    <div className='edit-submit-wrapper'>
                        <div id='edit-cancel-button'
                            onClick={cancelEditComment}
                        >Cancel</div>
                        <div id='edit-submit-button'
                            onClick={handleEditComment}
                            className='disabled-save'
                        >Save</div>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default CommentCards;
