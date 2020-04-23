
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import DashboardPostItem from './DashboardPostItem'

class DashboardPosts extends Component {
  render() {

    const { posts } = this.props;
   

    return posts.map(post => <DashboardPostItem key={post._id} post={post} />);
  }
}

DashboardPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default  DashboardPosts;




















//posts.map(post => <DashboardPostItem key={post._id} post={post} />);
//(<div></div>)

//console.log("Posts are here: ", posts)
//console.log(typeof posts)