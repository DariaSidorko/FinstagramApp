
import React, { Component } from 'react'
import PropTypes from 'prop-types';


import DashboardPostItem from './DashboardPostItem'

class DashboardPosts extends Component {
  render() {

    const { posts } = this.props;
    console.log("Posts are here: ", posts)
    console.log(typeof posts)

    return (<div></div>)
  }
}

DashboardPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default  DashboardPosts;

//posts.map(post => <ProfilePostItem key={post._id} post={post} />);