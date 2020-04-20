import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
//import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {


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
        <div className="like-icon"><i className="far fa-heart"></i></div>
        <div className="comment-icon"><i className="far fa-comment"></i></div>
        <div className="bookmark-icon"><i className="far fa-bookmark"></i></div>  

        <div className="likes">{post.likes.length} likes</div>
        <div>
    <span className="username-caption">{post.handle}</span><span className="post-caption">This is my first post #haha #firstpost</span>
        </div>  

        <div className="timestamp">4 Hours Ago</div>
      </div>  
      <div className="input-contanier">
        <input className="comment-input" placeholder="Add a comment..."/>
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
    //addLike: PropTypes.func.isRequired,
    //removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { /* deletePost, addLike, removeLike */ })(
    PostItem
  );
  