
import '../../css/comments-page.css';

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostItem from '../posts/PostItem';
import { addComment, getPost } from '../../actions/postActions'
import CommentFeed from './CommentFeed';


 class CommentsPage extends Component {

  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id);
  }


  constructor() {
    super();
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

    const { post } = this.props;
    const { user } = this.props.auth;

    const newComment = {
      text: this.state.text,
      handle: user.handle,
      name: user.name,
      avatar: user.avatar,
      user: user.user,
    }
    console.log(newComment)
    this.props.addComment(this.props.match.params.id, newComment)
    this.setState({ text: '' });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }


  render() {
    const { user } = this.props.auth;
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <div className="loader"></div>
    } else {
      postContent = (
        <CommentFeed postId={post._id} comments={post.comments} />
      )
    }


    return (
      <div>
        <div className="comments-wrapper">
            <div className="comments-wrapper-content">
              <div className="comments-main-content">

                    <div className="tab-content " > 
                      <div className="row">
                        <div className="col-7 ">
                          <img className="comments-image" src={post.image} alt="" />
                        </div>               

                        <div className="col-5 comments-side-wrapper">
                          <div className="comments-side-header">
                            <Link to="/profile"><img src={post.avatar} alt="img" className="comments-avatar"/></Link>
                            <div className="comments-username">{post.handle}</div>
                          </div>
                          <div className="overflow-auto comments-scrolling">
                            {postContent}
                          </div>    

                          <form className="comments-sidebar-input" onSubmit={this.onSubmit}>
                            <div class="input-group mb-3">
                              <input type="text" className="form-control comment-input" placeholder="Add a comment..." 
                              name="text" value={this.state.text}  onChange={this.onChange} required/>
                              <div className="input-group-append">
                                <button className="btn post-button" type="submit" >Post</button>
                              </div>
                            </div>
                          </form>

                        </div>
                      </div>    
                        
                    </div>
              </div>
            </div>
          </div>
        
      </div>
    )
  }
}


CommentsPage.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, getPost })(CommentsPage);

//connect(mapStateToProps, { getPost })



