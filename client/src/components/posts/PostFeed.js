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

    const { posts, loading } = this.props;
    const { user } = this.props.auth;
    let postContent;

    console.log("Type of posts in the feed: ", typeof posts)

    if (posts === null || loading || Object.keys(posts).length === 0) {
      postContent = <div className="loader"></div>;
    } else {
        postContent = <Posts posts={posts} />;
    }


    return (
    // posts.map(post => <PostItem key={post._id} post={post} />);
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
