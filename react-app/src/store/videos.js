const GET_VIDEOS = 'videos/GET_VIDEOS';
const GET_ONE_VIDEO = 'videos/GET_ONE_VIDEO';
const CLEAR_VIDEO = 'videos/CLEAR_VIDEO';
const GET_USER_VIDEOS = 'videos/GET_USER_VIDEOS';
const GET_USER_LIKES = 'videos/GET_USER_LIKES';
const GET_USER_DISLIKES = 'videos/GET_USER_DISLIKES';

export const clearVideoAction = () => ({
    type: CLEAR_VIDEO
})

const getVideosAction = (payload) => ({
    type: GET_VIDEOS,
    payload
})

const getOneVideo = (payload) => ({
    type: GET_ONE_VIDEO,
    payload
})

const getUserVideos = (payload) => ({
    type: GET_USER_VIDEOS,
    payload
})

const getUserLikes = (payload) => ({
    type: GET_USER_LIKES,
    payload
})

const getUserDislikes = (payload) => ({
    type: GET_USER_DISLIKES,
    payload
})

export const getUserLikesThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/users/likes/${videoId}`)

    if(response.ok) {
        const userLikes = await response.json();
        dispatch(getUserLikes(userLikes))
    }
}

export const getUserDislikesThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/users/dislikes/${videoId}`)
    if(response.ok) {
        const userDislikes = await response.json();
        dispatch(getUserDislikes(userDislikes))
    }
}

export const addLikeThunk = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}/likes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoId)
    });
    await fetch(`/api/videos/${videoId}/numlikes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoId)
    });
}

export const addDislikeThunk = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}/dislikes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoId)
    })
}

export const removeLikeThunk = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}/likes/delete`, {
        method: 'DELETE'
    })
}

export const removeDislikeThunk = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}/dislikes/delete`, {
        method: 'DELETE'
    })
}

export const editVideoThunk = (data) => async (dispatch) => {
    await fetch(`/api/videos/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteVideoThunk = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
    });
}

export const getUserVideosThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/videos')

    if(response.ok){
        const userVideos = await response.json()
        dispatch(getUserVideos(userVideos));
    }
}

export const getOneVideoThunk = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`)

    if(response.ok) {
        const oneVideo = await response.json()
        dispatch(getOneVideo(oneVideo))
    }
}

export const getVideosThunk = () => async (dispatch) => {
    const response = await fetch('/api/videos')

    if(response.ok) {
        const allVideos = await response.json()
        dispatch(getVideosAction(allVideos))
    }
}

const initialState = {
    allVideos: {},
    oneVideo: {},
    userVideos: {},
    userLikes: {},
    userDislikes: {}
}

const videos = (state = initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case GET_VIDEOS:
            newState.allVideos = action.payload
            return newState
        case GET_ONE_VIDEO:
            newState.oneVideo = action.payload
            return newState
        case CLEAR_VIDEO:
            newState.oneVideo = {}
            return newState
        case GET_USER_VIDEOS:
            newState.userVideos = action.payload
            return newState
        case GET_USER_LIKES:
            newState.userLikes = action.payload
            return newState
        case GET_USER_DISLIKES:
            newState.userDislikes = action.payload
            return newState
        default:
            return state
    }
}

export default videos;
