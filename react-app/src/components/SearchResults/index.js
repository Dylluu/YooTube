import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './SearchResults.css';
import { useDispatch, useSelector } from 'react-redux';

function SearchResults() {
    const dispatch = useDispatch();
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

    console.log(videoMatches, 'VIDEO MATCHES');
    console.log(userMatches, 'USER MATCHES');
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
                </div>
            </div>
        </div>
    )
}

export default SearchResults;
