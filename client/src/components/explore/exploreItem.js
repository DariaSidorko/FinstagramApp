import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class exploreItem extends Component {

  render() {
    const { post } = this.props;

    return (
      <div className="container">
        <div className="gallery">
          <div className="gallery-item" tabIndex="0">
            <Link to={`/profile/${post.handle}`}>
              <img src={post.image} className="gallery-image" alt="" />
            <div className="gallery-item-info"> 
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                <i className="fas fa-heart" aria-hidden="true"></i> {post.likes !== undefined && post.likes.length }</li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                  <i className="fas fa-comment" aria-hidden="true"></i> {post.comments !== undefined && post.comments.length }</li>
              </ul>  
            </div> 
            </Link>
          </div> 
        </div>  
      </div>
    )
  }
}

exploreItem.propTypes = {
  post: PropTypes.object.isRequired,
  //auth: PropTypes.object.isRequired
};

/* const mapStateToProps = state => ({
  auth: state.auth
}); */

export default exploreItem;