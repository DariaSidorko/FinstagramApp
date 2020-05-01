import './App.css';

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/create-edit-profile/CreateEditProfile';
import PostFeed from './components/posts/PostFeed';
import PostForm from './components/posts/PostForm';
import Comments from './components/comments/CommentsPage';
import Profile from './components/profile/Profile';
import Explore from './components/explore/exploreProfiles';
import LikesCommentsFeed from './components/likes-and-comments/likesCommentsFeed'
import Emoji from './components/posts/Emoji';
import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { logoutUser } from './actions/authActions';
import { SET_CURRENT_USER } from './actions/types';



if(localStorage.jwtToken){

  //decode
  const decoded = jwt_decode(localStorage.jwtToken);  
  //check for expired token
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime){
    //logout
    store.dispatch(logoutUser());
    //redirect user to the login page
    window.location.href = '/';
  }
  //set auth header
  setAuthToken(localStorage.jwtToken);

  //dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });



}

//<Route exact path="/profile/:handle" component={Profile} />
//<Route exact path="/profiles" component={Profiles} />
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Emoji symbol="🐑" label="sheep"/>

            <Route exact path="/" component={Login} /> 
            <div className="">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/explore" component={Explore} />
                <Route exact path="/comments/:id" component={Comments} ></Route>
              <PrivateRoute exact path="/post-feed" component={PostFeed} ></PrivateRoute>
              <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-post" component={PostForm} ></PrivateRoute>
              </Switch>
              
              <Switch>
                <PrivateRoute exact path="/likes-comments" component={LikesCommentsFeed} ></PrivateRoute>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
