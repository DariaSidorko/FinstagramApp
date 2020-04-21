import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addComment } from '../../actions/postActions';
import { deletePost, addLike, removeLike, addBookmark, removeBookmark } from '../../actions/postActions';

class PostItem extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      errors: {}
    };   

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const { user } = this.props.auth;
    const { post } = this.props;
    console.log('Post ID: ', post._id)
    const newComment = {
      text: this.state.text,
      handle: user.handle,
      name: user.name,
      avatar: user.avatar,
      user: user.user,
    }

    this.props.addComment(post._id, newComment)
    this.setState({ text: '' });
  }


  // Checking for user Id in likes and bookmarks
   findUserId(param) {
    const { auth } = this.props;
    if (param.filter(param => param.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onLikeDislikeClick(id, likes) {
    if (this.findUserId(likes)) {
      this.props.removeLike(id);
    } else {
      this.props.addLike(id);
    }
  }

  onAddRemoveBookmarkClick(id, bookmarks){
    if(this.findUserId(bookmarks)) {
      this.props.removeBookmark(id);
    } else {
      this.props.addBookmark(id);
    }
  }
 

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }



// full heat: <i class="fas fa-heart"></i>
// full comment: <i class="fas fa-comment"></i>
// full bookmark: <i class="fas fa-bookmark"></i>

  render() {
    const { post /* showActions */ } = this.props;

    return (
 
    <div className=" col-8 post padding-bottom:40px;">
      <div className="post-header">
          <img src={ post.avatar } alt="avatar" />
        <div className="username">{ post.handle }</div>
        <div className="more-options"></div>
      </div>     
      <div className="post-container">
      <img src={post.image} alt="instagram post" />
      </div>
      <div className="post-bottom">

        <div className="like-icon"
          onClick={this.onLikeDislikeClick.bind(this, post._id, post.likes)} 
          type="button">
          <i className={classnames('far fa-heart', {'fas fa-heart red-heart': this.findUserId(post.likes)})}></i></div>


        <div className="comment-icon"><i className="far fa-comment"></i></div>

        <div className="bookmark-icon"
          onClick={this.onAddRemoveBookmarkClick.bind(this, post._id, post.bookmarks)} 
          type="button">
          <i className={classnames("far fa-bookmark", {'fas fa-bookmark': this.findUserId(post.bookmarks)})}></i></div>  

        <div className="likes">{post.likes.length} likes</div>
        <div>
          <span className="username-caption">{post.handle}</span><span className="post-caption">{post.text}</span>
        </div>  

        <div className="timestamp">4 Hours Ago</div>

        <Link to={`/comments/${post._id}`}>
        { post.comments.length === 1 && ( <div className="comments">View {post.comments.length} comment...</div>)}
        { post.comments.length > 1  && <div className="comments">View all {post.comments.length} comments...</div> || ""}
        </Link>
      </div>  
      <div className="input-contanier">

        <div className="input-group mb-3">
          <form onSubmit={this.onSubmit}>
            <input type="text" className="form-control comment-input" placeholder="Add a comment..." 
              name="text" value={this.state.text}  onChange={this.onChange} required/>
            <div className="input-group-append">
              <button className="btn post-button" type="submit" >Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    );
  }
}


/*   PostItem.defaultProps = {
    showActions: true
  }; */
  
  PostItem.propTypes = {
    //deletePost: PropTypes.func.isRequired,
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { addComment, addLike, removeLike, addBookmark, removeBookmark /* deletePost, removeLike */ })(PostItem);
  