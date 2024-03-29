import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TopNavigation from './components/TopNavigation';
import LeftNavigation from './components/LeftNavigation';
import Dashboard from './components/Dashboard';
import VideoPage from './components/VideoPage';
import YourChannel from './components/YourChannel';
import SearchResults from './components/SearchResults';
import ChannelsPage from './components/ChannelsPage';
import LikedVideos from './components/LikedVideos';
import History from './components/History';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/videos/:videoId'>
          <TopNavigation />
          <VideoPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/channel' exact={true}>
          <TopNavigation />
          <LeftNavigation />
          <YourChannel />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <TopNavigation />
          <LeftNavigation />
          <Dashboard />
        </Route>
        <Route path='/search/:params' exact={true}>
          <TopNavigation />
          <LeftNavigation />
          <SearchResults />
        </Route>
        <Route path='/channels/:username' exact={true}>
          <TopNavigation />
          <LeftNavigation />
          <ChannelsPage />
        </Route>
        <Route path='/liked-videos' exact={true}>
          <TopNavigation />
          <LeftNavigation />
          <LikedVideos />
        </Route>
        <Route path='/history' exact={true}>
          <TopNavigation />
          <LeftNavigation />
          <History />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
