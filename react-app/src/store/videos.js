const GET_VIDEOS = 'videos/GET_VIDEOS';
const GET_ONE_VIDEO = 'videos/GET_ONE_VIDEO';
const CLEAR_VIDEO = 'videos/CLEAR_VIDEO';

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
    oneVideo: {}
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
        default:
            return state
    }
}

export default videos;
