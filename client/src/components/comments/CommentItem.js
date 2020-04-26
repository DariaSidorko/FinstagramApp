

import '../../css/comments-page.css';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions'

class CommentItem extends Component {


  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="comments-each-comment-wrapper">
        <div className="row">
          <Link to="/profile"><img src={comment.avatar} alt="img" className="comments-avatar"/></Link>
          <div className="comments-username">{comment.handle}</div>
          
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
        <div className="row">
          <div className="comments-content">{comment.text}</div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  //addComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem)