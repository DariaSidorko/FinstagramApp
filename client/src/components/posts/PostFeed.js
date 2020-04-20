import '../../css/post-feed.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions'
import Posts from './Posts';


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
      postContent = <div className="loader"></div>; // NEED TO IMPORT
    } else {
        postContent = <Posts posts={posts} />;
    }

    return (
      <div>
        <div className="post-contanier">
          <div className="row">
            {postContent}
            
            <div className="col-4">
              <div className="side-bar-header">
                <img src={ user.avatar } alt="avatar" />
                <div className="username">{ user.handle }</div>
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
  posts: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts })(PostFeed);
