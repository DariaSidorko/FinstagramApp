import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addComment, deletePost, addLike, removeLike, addBookmark, removeBookmark } from '../../actions/postActions';
import moment from 'moment';

class PostItem extends Component {

  constructor(props) {
    super(props);
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

    const newComment = {
      text: this.state.text,
      handle: user.handle,
      name: user.name,
      avatar: user.avatar,
      user: user.id,
    }
 
    this.props.addComment(post._id, newComment)
    this.setState({ text: '' });
    window.location.reload(false);
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
    } else {;
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

  onDeletePostClick(id){

    this.props.deletePost(id);
   //window.location.reload(false);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    } 
  }

// site for the random image to post:
//https://source.unsplash.com/random

  render() {
    const { post, auth } = this.props;
    const { errors } = this.state;

    return (
 
    <div className=" col-8 post">
      <div className="post-header">
        { auth.isAuthenticated && auth.user.handle === post.handle ? 
          <Link className="avatar-username-link" to="/dashboard">
            <img src={ post.avatar } alt="avatar" />
            <div className="username">{ post.handle }</div>
          </Link> :
          <Link className="avatar-username-link" to={`/profile/${post.handle}`}>
            <img src={ post.avatar } alt="avatar" />
            <div className="username">{ post.handle }</div>
          </Link>
        }
        

        {post.user === auth.user.id ? (
              <div
                onClick={this.onDeletePostClick.bind(this, post._id)}
                type="button"
                className="post-delete">
                <i className="fas fa-times" />
              </div>
            ) : null}

      </div>     
      <div className="post-container">
      <img src={post.image} alt="instagram post" className="post-img"/>
      </div>
      <div className="post-bottom">

        <div className="like-icon"
          onClick={this.onLikeDislikeClick.bind(this, post._id, post.likes)} 
          type="button">
          <i className={classnames('far fa-heart', {'fas fa-heart red-heart': this.findUserId(post.likes)})}></i></div>


        <Link to={`/comments/${post._id}`} className="comment-icon"><i className="far fa-comment"></i></Link>

        <div className="bookmark-icon"
          onClick={this.onAddRemoveBookmarkClick.bind(this, post._id, post.bookmarks)} 
          type="button">
          <i className={classnames("far fa-bookmark", {'fas fa-bookmark': this.findUserId(post.bookmarks)})}></i>
        </div>  

        <div className="likes">{post.likes.length} likes</div>
        <div>
          <span className="username-caption">{post.handle}</span><span className="post-caption">{post.text}</span>
        </div>  

        <div className="timestamp">{moment(post.date).startOf('hour').fromNow()}</div>

        <Link to={`/comments/${post._id}`}>
        { post.comments.length === 1 ? ( <div className="comments">View {post.comments.length} comment...</div>) : undefined}
        { post.comments.length > 1  ? <div className="comments">View all {post.comments.length} comments...</div> : ""}
        </Link>
      </div>  
      <div className="input-contanier">
        <form onSubmit={this.onSubmit}>
            <div className="input-group mb-3">
              <input type="text" className={classnames('form-control gallery-form-control comment-input', {'is-invalid': errors.bio})} placeholder="Add a comment..." 
                name="text" value={this.state.text}  onChange={this.onChange} autoComplete="off" required/>
                {errors.text && (
                  <div className="invalid-feedback"> {errors.text}</div>
                )}
              <div className="input-group-append">
                <button className="btn post-button" type="submit" >Post</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    );
  }
}

  
  PostItem.propTypes = {
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { addComment, addLike, removeLike, addBookmark, removeBookmark, deletePost  })(PostItem);
  