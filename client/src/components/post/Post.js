import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component{
  componentDidMount(){
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const {post, loading} = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length ===0) {
      postContent = <Spinner/>;
    } else{
      postContent =(
        <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }
  return(

<div className="post-contanier">
​
   <div className="post">
   <div className="post-header">
      <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533122246/profile-picture.jpg" 
      alt="avatar" />
    <div className="username">johnjames.21</div>
    <div className="more-options"></div>
  </div>     
  <div className="post-container">
  <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1532848922/samples/food/spices.jpg" 
  alt="instagram post" />
  </div>
  <div className="post-bottom">
    <div className="like-icon"></div>
    <div className="comment-icon"></div>
    <div className="bookmark-icon"></div>  
​
    <div className="likes">455 likes</div>
    <div>
      <span className="username-caption">johnjames.21</span>
      <span>This is my first post #haha #firstpost</span>
    </div>  
​
    <div className="timestamp">4 Hours Ago</div>
  </div>  
  <div className="input-contanier">
    <input className="comment-input" placeholder="Add a comment..."/>
  </div>
  </div> 
​
<div className="post">
  <div className="post-header">
      <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533122246/profile-picture.jpg" 
      alt="avatar" />
    <div className="username">johnjames.21</div>
    <div className="more-options"></div>
  </div>     
  <div className="post-container">
  <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1532848922/samples/food/spices.jpg" 
  alt="instagram post" />
  </div>
  <div className="post-bottom">
    <div className="like-icon"></div>
    <div className="comment-icon"></div>
    <div className="bookmark-icon"></div>  
​
    <div className="likes">455 likes</div>
    <div>
      <span className="username-caption">johnjames.21</span>
      <span>This is my first post #haha #firstpost</span>
    </div>  
​
    <div className="timestamp">4 Hours Ago</div>
  </div>  
  <div className="input-contanier">
    <input className="comment-input" placeholder="Add a comment..."/>
  </div>
</div> 
​

</div>
);
}
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost })(
  (Post)
);