const GET_VIDEOS = 'videos/GET_VIDEOS';

const getVideosAction = (payload) => ({
    type: GET_VIDEOS,
    payload
})

export const getVideosThunk = () => async (dispatch) => {
    const response = await fetch('/api/videos')

    if(response.ok) {
        const allVideos = await response.json()
        dispatch(getVideosAction(allVideos))
    }
}

const initialState = {
    allVideos: {}
}

const videos = (state = initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case GET_VIDEOS:
            newState.allVideos = action.payload
            return newState
        default:
            return state
    }
}

export default videos;
