import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { connect } from 'react-redux';

class Posts extends Component {
  render() {
    const { posts } = this.props;
    const { profile } = this.props.profiles;
    const { user } = this.props.auth;
    let userPosts = [];


      if (profile.following.length > 0) {
        profile.following.filter(follow => {
            userPosts = posts.filter(post => post.user === follow.user || post.user === user.id)
        })
      }
          else {
        userPosts = posts.filter(post => post.user === user.id)
      }


    return userPosts.map(post => <PostItem key={post._id} post={post} />)

}
}

Posts.propTypes  = {
  posts: PropTypes.array.isRequired,
  //profile: PropTypes.object.isRequired
};
//(posts.filter(post => profile.followin.filter(follow => follow.user === post.user).length > 0).map(post => <PostItem key={post._id} post={post} />));


const mapStateToProps = state => ({
  profiles: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, {})(Posts)
