import '../../css/profile.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profileActions';


class Profile extends Component {
  

  componentDidMount() {
    this.props.getCurrentProfile();
  }

   componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  } 
  
  //const { profile, loading } = this.props.profile;
  //{profile.handle && profile.handle || ""}
  // {profile.bio && profile.bio || ""}
  // console.log("print: ", this.props.profile)
  render() {
    const  { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let profileContent;

    if (profile === null || loading) {
      profileContent = (<div className="loader"></div>)
    } else {
      profileContent = (
        <div className="row main-containier">
          <div className="col-6 profile-avatar ">
            <img src={user.avatar} alt="" />
          </div>
          <div className="col-6">
            <div className="row profile-user-settings">
              <div className="profile-user-name">{profile.handle}</div>
              <Link to="/edit-profile" className="btn profile-edit-btn">Edit Profile</Link>
              <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
            </div>
            <div className="row profile-stats">
                <div><span className="profile-stat-count">164</span> posts</div>
                <div><span className="profile-stat-count">{profile.followers !== undefined && profile.followers.length }</span> followers</div>
                <div><span className="profile-stat-count">{profile.following !== undefined && profile.following.length }</span> following</div>
            </div>
            <div className="profile-bio">
              <div className="profile-real-name">{user.name}</div> 
              <div>{profile.bio}</div>
            </div>
          </div>
        </div>  
      )
    }



    return (
      <div>
        <header>
          <div className="container">
            {profileContent}
          </div>
        </header>

      <main>
      <div className="container">
      <div className="gallery">
        <div className="gallery-item" tabIndex="0">
          <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt="" />
          <div className="gallery-item-info"> 
            <ul>
              <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
              <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
            </ul>  
          </div> 
        </div> 
        <div className="gallery-item" tabIndex="0">
          <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" className="gallery-image" alt="" />
          <div className="gallery-item-info"> 
            <ul>
              <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 89</li>
              <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 5</li>
            </ul>
          </div>
        </div>
        <div className="gallery-item" tabIndex="0"> 
          <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" className="gallery-image" alt="" />
          <div className="gallery-item-type">
            <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
          </div> 
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 42</li>
              <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 1</li>
            </ul>
          </div> 
        </div>  
        </div>  
      </div>
      </main>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
