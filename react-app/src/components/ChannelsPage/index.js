import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ChannelsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {username} = useParams();
    const allUsers = useSelector(state => state.session.allUsers);
    const user = allUsers?.find(user => user.username == username);
    const allVideos = useSelector(state => state.videos.allVideos.videos);
    const userVideos = allVideos?.filter(video => video.user_id == user?.id);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const homeButton = document.getElementById('left-nav-home');
        if(homeButton) homeButton.classList.add('your-channel-left-nav-home');
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if (!userVideos) return <div className='empty-container'></div>;

    return (
        <div className='your-channel-container'>
            <div className='your-channel-inner-wrapper'>
                <div className='your-channel-header'>
                    {!user.profile_pic && (
                        <div id='your-channel-first-initial'>{user?.username[0]}</div>
                    )}
                    {user.profile_pic && (
                        <img alt={user.username} src={user.profile_pic} id='your-channel-profile-pic' />
                    )}
                    <div className='your-channel-header-user-info'>
                        <span id='your-channel-header-user-first-last'>{user.first_name} {user.last_name}</span>
                        <span id='your-channel-header-user-username'>@{user.username}</span>
                    </div>
                </div>
                <div className='your-channel-page-bar'>
                    <span id='your-channel-page-bar-videos'>VIDEOS</span>
                </div>
                <div className='your-channel-page-main-wrapper'>
                    {userVideos.length == 0 && <span id='no-videos-yet'>No videos yet</span>}
                    {userVideos.length > 0 && (
                        <div className='your-channel-user-videos-container'>
                            {userVideos.map(userVid => (
                                <div className='your-channel-user-video-card' key={userVid.id} onClick={() => history.push(`/videos/${userVid.id}`)}
                                style={{cursor: 'pointer', width: 'fit-content'}}
                                >
                                <img alt={userVid.title} src={userVid.thumbnail} id='your-channel-user-video-card-thumbnail'
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg";
                                    }}
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

export default ChannelsPage;
