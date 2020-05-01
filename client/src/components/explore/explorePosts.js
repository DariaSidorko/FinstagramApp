import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExploreItem from './exploreItem';

class explorePosts extends Component {
  render() {
    const { posts } = this.props;
    const { user } = this.props.auth;

    return posts.filter(post => post.user !== user.id).map(post => <ExploreItem key={post._id} post={post} />)
    
  }
}

explorePosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(explorePosts);
