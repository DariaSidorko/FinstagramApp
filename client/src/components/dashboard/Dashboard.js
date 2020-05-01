import '../../css/profile.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profileActions';
import { getPosts } from '../../actions/postActions';
import DashboardPosts from './DashboardPosts';


class Dashboard extends Component {
  

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPosts();
  }

  /*  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }  */
  //auth.isAuthenticated === true ? 
  
  render() {
    const  { profile, profileLoading } = this.props.profile;
    const { posts, postLoading } = this.props.post;
    const { user } = this.props.auth;
    let profileContent, postContent;
    //console.log("Profile key: ", profile.bio)
    //<i className="fas fa-cog" aria-hidden="true"></i>

    if (profile === null || profileLoading || posts === null || postLoading || Object.keys(posts).length === 0) {
      profileContent = (<div className="d-flex justify-content-center loader"><div className="spinner-grow text-secondary" role="status"></div></div>)
    } else {
      postContent = <DashboardPosts posts={posts}  />;

      profileContent = (
        <div className="main-containier">
          <div className="row">
          <div className="col-5 profile-avatar ">
            <img src={user.avatar} alt="" />
          </div>
          <div className="col-7">
            <div className="row profile-user-settings">
              <div className="profile-user-name">{user.handle}</div>
              <Link to="/edit-profile" className="btn profile-edit-btn">Edit Profile</Link>
              <button className="btn profile-settings-btn" aria-label="profile settings"></button>
            </div>
            <div className="profile-stats">
                <div className="profile-stat"><span className="profile-stat-count">{posts.filter(post => post.user === user.id).length}</span> posts</div>
                <div className="profile-stat"><span className="profile-stat-count">{profile.followers !== undefined && profile.followers.length }</span> followers</div>
                <div className="profile-stat"><span className="profile-stat-count">{profile.following !== undefined && profile.following.length }</span> following</div>
            </div>
            <div className="profile-bio">
              <div className="profile-real-name">{user.name}</div> 
              <div><a href={profile.website} target="_blank">{profile.website}</a></div> 
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
          <div className="container">
            {profileContent}
          </div>
        </header>
        {postContent}     
      </div>
    )
  }
}


 Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(Dashboard);
