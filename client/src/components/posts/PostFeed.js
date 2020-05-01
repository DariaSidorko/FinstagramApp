import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts } from '../../actions/postActions'
import { getCurrentProfile } from '../../actions/profileActions'
import  isEmpty  from '../../validation/is-empty'
import Posts from './Posts';


class PostFeed extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();
  }

  render() {

    const { posts, postLoading } = this.props.posts;
    const { user } = this.props.auth;
    const { profile, profileLoading } = this.props.profiles;
    let postContent;


    if (posts === null || postLoading ||  profile === null || profileLoading ) {


      postContent = <div className="post-loader"><div className="spinner-grow text-secondary" role="status"></div></div>;
    } else if (isEmpty(posts) || isEmpty(profile)) {
      postContent = <div></div>
    } else {
        postContent = <Posts posts={posts} />;
    }

    return (
      <div>
        <div className="post-contanier">
          <div className="row">
            {postContent}
            <div className="fixed">
             
              <div className="row post-side-bar">
              <Link className="avatar-username-link" to="/dashboard">
                <img className="row post-side-avatar" src={ user.avatar } alt="avatar" />
              </Link>
                <div className="col">
                  <div className="post-side-username">{ user.handle }</div>
                  <div className="post-side-name">{ user.name }</div>
                </div>
              </div>  
                 
            </div>
          </div>
        </div>
      </div>
    )
  }
}


PostFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth,
  profiles: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(PostFeed);
