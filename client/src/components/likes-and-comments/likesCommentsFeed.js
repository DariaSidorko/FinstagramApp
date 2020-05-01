
import '../../css/likes-and-comments.css';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/postActions'

import LikesComments from './likesComments'

export class likesCommentsFeed extends Component {


  componentDidMount() {
    this.props.getPosts();
  }


  render() {
     //const { post, postLoading } = this.props.posts
     const { posts, postLoading } = this.props;
     let postContent;
     //console.log("POSTS: ", posts)

     if (posts === null || postLoading) {
      postContent = (<div className="post-loader"><div className="spinner-grow text-secondary" role="status"></div></div>)
     } else {
        postContent = <LikesComments posts={posts} />;
      }

     



    return  (
    <div>
      <div className="container likes-comments-wrapper">
        {postContent}
        <div className="emoji">
      
        <span aria-label="a rocket blasting off" role="img">🚀</span>
          <span aria-hidden="true" role="img">🤫</span>
          <span role="img" aria-label="sheep">🐑</span>
          <span role="img" aria-label="time"> 🔢</span>
          <span role="img" aria-label= "100">💯</span>
          <span role="img" aria-label="joy">😀</span>
          <span role="img" aria-label="angry">😬</span>
          <span role="img" aria-label="laugh">😁</span>
          <span role="img" aria-label="doublelaugh">😂</span>
        </div>
      </div>
    </div>
    )
  }
}

likesCommentsFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  posts: state.post
})


export default connect(mapStateToProps, { getPosts })(likesCommentsFeed)
