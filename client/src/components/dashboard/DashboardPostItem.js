
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class DashboardPostItem extends Component {
  render() {
    const { post, auth } = this.props;
    console.log("post: ",post)

    return (
      <div className="container">
        <div className="gallery">
          <div className="gallery-item" tabIndex="0">
            <img src={post.image} className="gallery-image" alt="" />
            <div className="gallery-item-info"> 
              <ul>
                <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
                <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
              </ul>  
            </div> 
          </div> 
        </div>  
      </div>
    )
  }
}

DashboardPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default DashboardPostItem;