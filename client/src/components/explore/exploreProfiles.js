import '../../css/profile.css';
import '../../css/explore.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

import ExplorePosts from './explorePosts';

/***************** 
Explore navbar icone to find new profiles 
/explore
*****************/

class exploreProfiles extends Component {


  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile()
  }

  render() {
    const { posts, postLoading } = this.props.posts;
    const { profile, profileLoading } = this.props.profile;
    let postContent;
  
    if ( posts === null || postLoading || profile === null || profileLoading  ) {
      postContent = (<div className="d-flex justify-content-center loader"><div className="spinner-grow text-secondary" role="status"></div></div>)
    } else {
      postContent = <ExplorePosts posts={posts} />
    }

    return (
      <div className="">
        <div className="top-wrapper">
          <div className="gallery">
            {postContent}
          </div>
        </div>
      </div>
    )
  }
}

exploreProfiles.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  //posts: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  //auth: state.auth,
  profile: state.profile,
  posts: state.post
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(exploreProfiles);