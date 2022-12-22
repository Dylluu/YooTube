const GET_COMMENTS = 'comments/GET_COMMENTS';
const GET_COMMENT_LIKES = 'comments/GET_COMMENT_LIKES';
const GET_COMMENT_DISLIKES = 'comments/GET_COMMENT_DISLIKES';

const getCommentsAction = (payload) => ({
    type: GET_COMMENTS,
    payload
})

const getCommentLikesAction = (payload) => ({
    type: GET_COMMENT_LIKES,
    payload
})

const getCommentDislikesAction = (payload) => ({
    type: GET_COMMENT_DISLIKES,
    payload
})

export const getUserCommentDislikesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/users/commentdislikes`);
    if(response.ok) {
        const userCommentDislikes = await response.json();
        await dispatch(getCommentDislikesAction(userCommentDislikes));
    }
}

export const dislikeCommentThunk = (commentId) => async (dispatch) => {
    await fetch(`/api/comments/${commentId}/dislikes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentId)
    })
}

export const removeDislikeCommentThunk = (commentId) => async (dispatch) => {
    await fetch(`/api/comments/${commentId}/dislikes/delete`, {
        method: 'DELETE'
    })
}

export const getUserCommentLikesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/users/commentlikes`);
    if(response.ok) {
        const userCommentLikes = await response.json();
        await dispatch(getCommentLikesAction(userCommentLikes));
    }
}

export const likeCommentThunk = (commentId) => async (dispatch) => {
    await fetch(`/api/comments/${commentId}/likes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentId)
    })
}

export const removeCommentLikeThunk = (commentId) => async (dispatch) => {
    await fetch(`/api/comments/${commentId}/likes/delete`, {
        method: 'DELETE'
    })
}

export const postCommentThunk = (videoId, comment) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}/comments/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment
        })
    })
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

}

export const getCommentsThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/comments`)

    if(response.ok) {
        const comments = await response.json()
        dispatch(getCommentsAction(comments))
    }
}

export const editCommentsThunk = (data) => async (dispatch) => {
    await fetch(`/api/comments/${data.id}`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

const initialState = {
    comments: {},
    user_comment_likes: {},
    user_comment_dislikes: {}
}

const comments = (state = initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case GET_COMMENTS:
            newState.comments = action.payload.comments.reverse()
            return newState
        case GET_COMMENT_LIKES:
            newState.user_comment_likes = action.payload
            return newState
        case GET_COMMENT_DISLIKES:
            newState.user_comment_dislikes = action.payload
            return newState
        default:
            return state
    }
}

export default comments;
