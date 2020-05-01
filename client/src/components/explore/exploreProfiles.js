import '../../css/profile.css';
import '../../css/explore.css';

import { Component } from 'react'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/postActions';

import ExplorePosts from './explorePosts';

class exploreProfiles extends Component {


  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, postLoading } = this.props.posts;
    let postContent;
  
    if ( posts === null || postLoading ) {
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
  //getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  //posts: PropTypes.array.isRequired,
  //profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  //auth: state.auth,
  //profile: state.profile,
  posts: state.post
});

export default connect(mapStateToProps, { getPosts })(exploreProfiles);