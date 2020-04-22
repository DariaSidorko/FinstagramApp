import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import EditProfile from './components/create-edit-profile/CreateEditProfile';
import PostFeed from './components/posts/PostFeed';
import PostForm from './components/posts/PostForm';
import Comments from './components/comments/CommentsPage';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';


if(localStorage.jwtToken){

  //decode
  const decoded = jwt_decode(localStorage.jwtToken);  
  //check for expired token
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime){
    //logout
    store.dispatch(logoutUser());
    //redirect user to the login page
    window.location.href = '/login';
  }
  //set auth header
  setAuthToken(localStorage.jwtToken);

  //dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });



}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Login} /> 
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/post-feed" component={PostFeed} />
            <Route exact path="/create-post" component={PostForm} />
            <Route exact path="/comments/:id" component={Comments} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
