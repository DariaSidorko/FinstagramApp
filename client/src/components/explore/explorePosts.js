import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExploreItem from './exploreItem';

/***************** 
Explore navbar icone to find new profiles 
/explore
*****************/

class explorePosts extends Component {
  render() {
    const { posts } = this.props;
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    let userPosts = []; 
    let count = 0;

    //Excluding users posts and posts of the profiles this user is following
    for (let i=0; i < posts.length; i++){
      if (posts[i].user !== user.id){
      for (let j=0; j < profile.following.length; j++){

        if (posts[i].user === profile.following[j].user){
          count++;
          break
        }
      }
      if (count === 0) {
        userPosts.push(posts[i])
      }
      count = 0;
    }
    }

    /* userPosts.sort(function(a,b){
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    }) */

    return userPosts.map(post => <ExploreItem key={post._id} post={post} />)
    
  }
}

explorePosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {})(explorePosts);
