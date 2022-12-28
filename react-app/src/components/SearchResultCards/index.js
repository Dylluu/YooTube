import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SearchResultCards ({userVid}) {
    const history = useHistory();
    const allUsers = useSelector(state => state.session.allUsers);
    const currVidUser = allUsers.find(user => user.id == userVid.user_id);

    if(!currVidUser) return null;

    return (
        <div className='your-channel-user-video-card' id='search-results-video-cards' key={userVid.id} onClick={() => history.push(`/videos/${userVid.id}`)}
            style={{ cursor: 'pointer', width: 'fit-content' }}
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
                    style={{ marginTop: '5px' }}
                >{userVid.num_views} views</span>
                <div className='search-results-cards-profile-pic-and-username'>
                    {currVidUser?.profile_pic && (<img alt={currVidUser?.username} src={currVidUser.profile_pic} id='search-results-cards-profile-pic-img'/>)}
                    {!currVidUser?.profile_pic && (<div className='search-results-cards-no-profile-pic'>
                        {currVidUser?.username[0]}
                    </div>)}
                    <span className='search-results-cards-username'>{currVidUser?.username}</span>
                </div>
                <p id='your-channel-user-video-card-details-views'
                    style={{ marginTop: '15px' }}
                >{userVid.description}</p>
            </div>
        </div>
    )
}

export default SearchResultCards;
