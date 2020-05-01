import '../../css/profile.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import  isEmpty  from '../../validation/is-empty'
import { getProfileByHandle, follow, unfollow } from '../../actions/profileActions';

import ProfilePostItem from './ProfilePostItem'



class Profile extends Component {

  constructor(props){
    super(props);
    this.onFollowUnfollowClick.bind(this);
    this.findUserId.bind(this);
  }

  saveStateToLocalStorage() {
    const posts = this.props.post.posts;    
    // save to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
    
  }
  
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
    if (!isEmpty(this.props.post.posts)){
      this.saveStateToLocalStorage.bind(this)
    }
  }

  onFollowUnfollowClick(params, id, handle) {
    if (this.findUserId(params)) {
      this.props.unfollow(id, handle);
    } else {
      this.props.follow(id, handle);
      
    } 
  }

 // Checking for user Id in likes and bookmarks
  findUserId(params) {
    const { user } = this.props.auth;
    if (params.filter(param => param.user === user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

    componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }  
  
  render() {
    const  { profile, profileLoading } = this.props.profile;
    const { user } = this.props.auth;
    let profileContent, postContent;


    let userPosts = localStorage.getItem("posts");
    userPosts = JSON.parse(userPosts);

    if (!isEmpty(userPosts)){
      userPosts = userPosts.filter(post => post.handle === this.props.match.params.handle);
    postContent = 
    <div className="dashboard-post-containier">
      <ul className="nav nav-tabs dashboard-post-containier" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
          <i className="fas fa-border-all tab-icons"></i>
            POSTS</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active dashboard-nav-tabs" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="gallery">
            {!isEmpty(userPosts)?  
              userPosts.map(post => <ProfilePostItem key={post._id} post={post} />) :
            < div className="gallery-noposts"> You have no posts. Create your first post.</div>
              }
            </div>
        </div>
      </div>
    </div>

    } else {
      postContent = <div>No posts loaded</div>
    }

    if ( profile === null || profileLoading) {
      profileContent = (<div className="d-flex justify-content-center loader"><div className="spinner-grow text-secondary" role="status"></div></div>)
    } else {
      profileContent = (
        <div className="top-wrapper">
          <div className="row profile-wrapper">
            <div className="col-4 profile-avatar ">
              <img src={profile.user.avatar} alt="" />
            </div>
            <div className="">
              <div className="profile-user-settings">
                <span className="profile-user-name">{this.props.match.params.handle}</span>
                {this.props.auth.isAuthenticated ? user.handle === this.props.match.params.handle ?
                  <Link to="/edit-profile" className="btn profile-edit-btn">Edit Profile</Link> : 
                  
                  <div className="btn profile-edit-btn"
                    onClick={this.onFollowUnfollowClick.bind( this, profile.followers, profile.user._id, profile.user.handle)} 
                    type="button">
                    {this.findUserId(profile.followers) ? "Unfollow" : "Follow"}</div>
                  : undefined}
              </div>
              <br></br>
              <div className="profile-stats">
                  <div className="profile-stat"><span className="profile-stat-count">{userPosts !== undefined && userPosts.length}</span> posts</div>
                  <div className="profile-stat"><span className="profile-stat-count">{profile.followers !== undefined && profile.followers.length }</span> followers</div>
                  <div className="profile-stat"><span className="profile-stat-count">{profile.following !== undefined && profile.following.length }</span> following</div>
              </div>
              <br></br>
              <div className="profile-bio">
                <div className="profile-real-name">{profile.user.name}</div> 
                <div>{profile.bio}</div>
              </div>
            </div>
          </div>
        </div>  
      )
    }

    return (
      <div>
        <header>
          {profileContent}
      </header>
      <main>
        {postContent}
      </main>
      </div>
    )
  }
}


 Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getProfileByHandle, follow, unfollow })(Profile);
