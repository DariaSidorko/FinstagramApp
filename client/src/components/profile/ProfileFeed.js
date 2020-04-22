/* 
import '../../css/profile.css';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPosts} from '../../actions/postActions';
import ProfilePosts from './ProfilePosts';


class ProfileFeed extends Component {

  componentDidMount() {

    this.props.getPosts();
  }


  render() {

    const { user } = this.props.auth;
    const { posts, loading } = this.props;
    let postContent;
    console.log(posts)
    
    //|| Object.keys(posts).length === 0

      if (posts === null || loading) {
      postContent = (<div className="loader"></div>)
    } else {
      postContent = <ProfilePosts posts={posts} />;
    }  


    return (
      <div>
        
      </div>
    )
  }
}

ProfileFeed.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  //profile: state.profile,
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(ProfileFeed) */