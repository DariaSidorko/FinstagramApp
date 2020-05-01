

import '../../css/comments-page.css';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions'
import moment from 'moment';

class CommentItem extends Component {


  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
    window.location.reload(false);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="comments-each-comment-wrapper">
        <div className="row">
        { auth.isAuthenticated && auth.user.handle === comment.handle ? 
          <Link to="/dashboard" className="avatar-username-link">
            <img src={ comment.avatar } alt="avatar" className="comments-avatar" />
            <span className="comments-username">{comment.handle}</span>
            </Link> :
          <Link to={`/profile/${comment.handle}`} className="avatar-username-link">
            <img src={ comment.avatar } alt="avatar" className="comments-avatar" />
            <span className="comments-username">{comment.handle}</span>
            </Link>
        }
           
          {comment.user === auth.user.id ? (
              <div
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="comments-delete"
              >
                <i className="fas fa-times" />
              </div>
            ) : null}
          
        </div>
        <div>
          <div className="comments-content">{comment.text}</div>
          <div className="comments-timestamp">{moment(comment.date).startOf('hour').fromNow()}</div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem)