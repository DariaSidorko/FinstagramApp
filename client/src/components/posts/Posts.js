import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import PostFeed from './PostFeed';

class Posts extends Component {
  render() {
    const { posts } = this.props;

    return 
    
    posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts;