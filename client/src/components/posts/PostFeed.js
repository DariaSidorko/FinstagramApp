import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions'


class PostFeed extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

//{posts.map(post => postContent)}
  render() {

    const { posts, loading } = this.props.posts;
    const { user } = this.props.auth;
    let postContent;
    // || Object.keys(posts).length === 0
    if (posts === null || loading ) {
      postContent = (<div className="loader"></div>); // NEED TO IMPORT
    } else {
        postContent = (
      <div className=" col-8 post">
        <div className="post-header">
            <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1532848922/samples/food/spices.jpg" alt="avatar" />
          <div className="username">johnjames.21</div>
          <div className="more-options"></div>
        </div>     
        <div className="post-container">
        <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1532848922/samples/food/spices.jpg" alt="instagram post" />
        </div>
        <div className="post-bottom">
          <div className="like-icon"></div>
          <div className="comment-icon"></div>
          <div className="bookmark-icon"></div>  

          <div className="likes">455 likes</div>
          <div>
            <span className="username-caption">johnjames.21</span><span className="post-caption">This is my first post #haha #firstpost</span>
          </div>  

          <div className="timestamp">4 Hours Ago</div>
        </div>  
        <div className="input-contanier">
          <input className="comment-input" placeholder="Add a comment..."/>
        </div>
      </div>
      )
    }

    return (
      <div>
        <div className="post-contanier">
          <div className="row">
          
            
            <div className="col-4">
              <div className="side-bar-header">
                <img src={ user.avatar } alt="avatar" />
                <div className="username">{ user.name }</div>
              </div>     
            </div>
          </div>
        </div>
      </div>
    )
  }
}


PostFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: PropTypes.func.isRequired,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts })(PostFeed);
