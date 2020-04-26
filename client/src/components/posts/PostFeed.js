import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions'
import { getCurrentProfile } from '../../actions/profileActions'
import  isEmpty  from '../../validation/is-empty'
import Posts from './Posts';


class PostFeed extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();
  }

/*   componentWillReceiveProps(nextProps) {
    if (nextProps.profiles.profile === null && this.props.profiles.profileLoading) {
      this.props.history.push('/not-found');
    }
  } */

//{posts.map(post => postContent)}
  render() {

    const { posts, loading } = this.props.posts;
    const { user } = this.props.auth;
    const { profile, profileLoading } = this.props.profiles;
    let postContent;

    //console.log("PROFILE: ", this.props.profiles.profile)

    console.log("Type of posts in the feed: ", posts)

    if (posts === null || loading || Object.keys(posts).length === 0 || profile === null || profileLoading ) {
      postContent = <div className="loader"></div>;
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
            
            <div className="col-4">
              <div className="side-bar-header">
                <img src={ user.avatar } alt="avatar" />
                <div className="username">{ user.handle }</div>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth,
  profiles: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(PostFeed);
