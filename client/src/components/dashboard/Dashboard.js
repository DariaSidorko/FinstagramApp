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

    if (profile === null || profileLoading) {
      profileContent = (<div className="loader"></div>)
    } else {
      profileContent = (
        <div className="row main-containier">
          <div className="col-6 profile-avatar ">
            <img src={user.avatar} alt="" />
          </div>
          <div className="col-6">
            <div className="row profile-user-settings">
              <div className="profile-user-name">{user.handle}</div>
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
    //state.posts.filter(post => post._id !== action.payload)

    if (posts === null || postLoading || Object.keys(posts).length === 0) {
      postContent = (<div className="loader"></div>)
    } else {
      postContent = <DashboardPosts posts={posts}  />;
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

 //{postContent}

 Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  //posts: PropTypes.array.isRequired,
  //profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(Dashboard);
