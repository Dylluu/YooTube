import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './SearchResults.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultCards from '../SearchResultCards';

function SearchResults() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {params} = useParams();
    const allVideos = useSelector(state => state.videos.allVideos.videos);
    const allUsers = useSelector(state => state.session.allUsers);
    const [videoMatches, setVideoMatches] = useState([]);
    const [userMatches, setUserMatches] = useState([]);
    const [userMatchesVideos, setUserMatchesVideos] = useState([]);

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
        let matchedUserVideos = [];
        for(let video of allVideos) {
            for(let user of matchedUsers) {
                if(video.user_id == user.id) {
                    if(!matchedVideos.includes(video)) {
                        matchedUserVideos.push(video);
                    }
                }
            }
        }
        setUserMatchesVideos(matchedUserVideos);
    }, [params])

    return (
        <div className='search-results-outer-container'>
            <div className='search-results-container'>
                <div className='search-results-inner-container'>
                    {userMatches.length == 0 && videoMatches.length == 0 && (
                        <span id='no-matches-found'>No matches found for "{params}"</span>
                    )}
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
                    <div className='your-channel-user-videos-container' id='search-results-videos-container'
                    style={{marginBottom: '25px'}}
                    >
                    {videoMatches.map(userVid => (
                        <SearchResultCards userVid={userVid} />
                    ))}
                    </div>
                    )}
                    {userMatchesVideos.length > 0 && (
                        <div className='your-channel-user-videos-container' id='search-results-videos-container'>
                            {userMatchesVideos.map(userVid => (
                                <SearchResultCards userVid={userVid} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchResults;
