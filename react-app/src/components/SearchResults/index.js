import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './SearchResults.css';
import { useDispatch, useSelector } from 'react-redux';

function SearchResults() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {params} = useParams();
    const allVideos = useSelector(state => state.videos.allVideos.videos);
    const allUsers = useSelector(state => state.session.allUsers);
    const [videoMatches, setVideoMatches] = useState([]);
    const [userMatches, setUserMatches] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        let matchedVideos = [];
        for(let video of allVideos) {
            if(video.title.toLowerCase().includes(params.toLowerCase())) {
                matchedVideos.push(video)
            }
        }
        setVideoMatches(matchedVideos);
        let matchedUsers = [];
        for(let user of allUsers) {
            if(user.username.toLowerCase().includes(params.toLowerCase())) {
                matchedUsers.push(user)
            }
        }
        setUserMatches(matchedUsers);
    }, [params])

    return (
        <div className='search-results-outer-container'>
            <div className='search-results-container'>
                <div className='search-results-inner-container'>
                    {userMatches.length > 0 && (
                        <div className='user-matches-container'>
                            {userMatches.map(user => (
                                <NavLink to={`/channels/${user.username}`} className='user-matches-cards'>
                                    {user.profile_pic && (
                                        <img alt={user.username} src={user.profile_pic} id='user-matches-profile-pic'/>
                                    )}
                                    {!user.profile_pic && (
                                        <div id='user-matches-first-initial'>
                                            {user.username[0]}
                                        </div>
                                    )}
                                    <div className='user-matches-info'>
                                        <span id='user-matches-info-name'>{user.first_name} {user.last_name}</span>
                                        <span className='user-matches-info-other'>
                                            @{user.username}
                                        </span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    )}
                    {videoMatches.length > 0 && (
                        <div className='your-channel-user-videos-container' id='search-results-videos-container'>
                            {videoMatches.map(userVid => (
                                <div className='your-channel-user-video-card' id='search-results-video-cards' key={userVid.id} onClick={() => history.push(`/videos/${userVid.id}`)}
                                style={{cursor: 'pointer', width: 'fit-content'}}
                                >
                                <img alt={userVid.title} src={userVid.thumbnail} id='your-channel-user-video-card-thumbnail'
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg";
                                    }}
                                    className='search-results-video-thumbnail'
                                />
                                <div className='your-channel-user-video-card-details'>
                                    <span id='your-channel-user-video-card-details-title'>{userVid.title}
                                    </span>
                                    <span id='your-channel-user-video-card-details-views'
                                    style={{marginTop: '5px'}}
                                    >{userVid.num_views} views</span>
                                    <p id='your-channel-user-video-card-details-views'
                                    style={{marginTop: '5px'}}
                                    >{userVid.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchResults;
