const GET_COMMENTS = 'comments/GET_COMMENTS';

const getCommentsAction = (payload) => ({
    type: GET_COMMENTS,
    payload
})

export const getCommentsThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${videoId}`)

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
            newState.comments = action.payload.comments
            return newState
        default:
            return state
    }
}

export default comments;
