import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExploreItem from './exploreItem';

class explorePosts extends Component {
  render() {
    const { posts } = this.props;

    console.log("Posts: ", posts)

    return posts.map(post => <ExploreItem key={post._id} post={post} />)
    
  }
}

explorePosts .propTypes = {
  posts: PropTypes.array.isRequired,
};

export default explorePosts ;

//posts.map(post => <ExploreItem key={post._id} post={post} />)