
import React, { Component } from 'react'
import PropTypes from 'prop-types';


import ProfilePostItem from './ProfilePostItem'

class ProfilePosts extends Component {
  render() {

    const { posts } = this.props;

    return posts.map(post => <ProfilePostItem key={post._id} post={post} />);
  }
}

ProfilePosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default  ProfilePosts;

