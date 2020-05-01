import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { connect } from 'react-redux';
import  isEmpty  from '../../validation/is-empty'

class Posts extends Component {
  render() {
    const { posts } = this.props;
    const { profile } = this.props.profiles;
    const { user } = this.props.auth;
    let userPosts = [];

      if (profile.following.length > 0) {
        for (let i = 0; i < profile.following.length; i++){
          userPosts = userPosts.concat(posts.filter(post => post.user === profile.following[i].user))
          
        }
        userPosts = userPosts.concat(posts.filter(post => post.user === user.id));

        //Sorting array by date
        userPosts.sort(function(a,b){
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        })
      }
      else {
        userPosts = posts.filter(post => post.user === user.id)
      }

    return  (!isEmpty(userPosts) ?  userPosts.map(post => <PostItem key={post._id} post={post} />) :
    <div className="post-noposts"> Post your first post or start following other profiles.</div>
    )

}
}

Posts.propTypes  = {
  posts: PropTypes.array.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, {})(Posts)
