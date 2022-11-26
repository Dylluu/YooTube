const GET_COMMENTS = 'comments/GET_COMMENTS';

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

const getCommentsAction = (payload) => ({
    type: GET_COMMENTS,
    payload
})

export const getCommentsThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/comments`)

    if(response.ok) {
        const comments = await response.json()
        dispatch(getCommentsAction(comments))
    }
}

const initialState = {
    comments: {}
}

const comments = (state = initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case GET_COMMENTS:
            newState.comments = action.payload.comments.reverse()
            return newState
        default:
            return state
    }
}

export default comments;
