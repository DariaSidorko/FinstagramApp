import '../../css/profile.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profileActions';


class Profile extends Component {
  

  componentDidMount() {
    console.log("Calling the func!")
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null) {
      this.props.history.push('/not-found');
    }
  }
  
  //const { profile, loading } = this.props.profile;
  //{profile.handle && profile.handle || ""}
  // {profile.bio && profile.bio || ""}
  render() {
    console.log("print: ", this.props.profile)
    return (
      <div>
        <header>
          <div className="container">
            <div className="profile">
              <div className="profile-image">
                <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />
              </div>
              <div className="profile-user-settings">
                <h1 className="profile-user-name">mane</h1>
                <Link to="/edit-profile" className="btn profile-edit-btn">Edit Profile</Link>
                <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
              </div>
              <div className="profile-stats">
                <ul>
                  <li><span className="profile-stat-count">164</span> posts</li>
                  <li><span className="profile-stat-count">188</span> followers</li>
                  <li><span className="profile-stat-count">206</span> following</li>
                </ul>
              </div>
              <div className="profile-bio">
                <p><span className="profile-real-name">Jane Doe</span> bio</p>
              </div>
            </div>
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
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
