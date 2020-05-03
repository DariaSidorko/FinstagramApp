
import '../../css/likes-and-comments.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class likesComments extends Component {
  render() {
    const { posts } = this.props;
    const { user } = this.props.auth;
    let userLikes = [];
    let userComments = [];

 

    // Users like
    for (let i=0; i < posts.posts.length; i++){
      if (posts.posts[i].user === user.id){
        for (let j=0; j < posts.posts[i].likes.length; j++){        
          let days = (moment(posts.posts[i].likes[j].date).startOf('day').fromNow()).split(' '); 
          let minutes = (moment(posts.posts[i].likes[j].date).startOf('hour').fromNow()).split(' '); 
          if (days[0] === 'a' || days[0] < 8 || minutes[1] === 'minutes' || minutes[1] === 'hours' || minutes[1] === 'hour'){

          let obj = {
              _id:  posts.posts[i].likes[j]._id,
              user:  posts.posts[i].likes[j].user,
              date: posts.posts[i].likes[j].date,
              text: posts.posts[i].text,
              post_id: posts.posts[i]._id,
              image: posts.posts[i].image
            }
            userLikes.push(obj);
          }
        } 

        for (let j=0; j < posts.posts[i].comments.length; j++){  
            
          let days = (moment(posts.posts[i].comments[j].date).startOf('day').fromNow()).split(' '); 
          let minutes = (moment(posts.posts[i].comments[j].date).startOf('hour').fromNow()).split(' '); 
          if (days[0] === 'a' || days[0] < 10 || minutes[1] === 'minutes'|| minutes[1] === 'hours' || minutes[1] === 'hour'){
          
          let obj = {
              _id:  posts.posts[i].comments[j]._id,
              user:  posts.posts[i].comments[j].user,
              date: posts.posts[i].comments[j].date,
              handle: posts.posts[i].comments[j].handle,
              text: posts.posts[i].comments[j].text,
              post_id: posts.posts[i]._id,
              image: posts.posts[i].image
            }
            userComments.push(obj);
          }
        }
      }
    }

    userLikes.sort(function(a,b){
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    })

    userComments.sort(function(a,b){
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    })


    let likesContent = userLikes.map((like, index) => (
      <div key={index} >
        <Link to={`/comments/${like.post_id}`} className="likes-comments-string">
        <span><img className="likes-comments-img" src={like.image} alt=""/></span>
        <span className="likes-comments-generic-text"> received new like on this image</span> 
        <span className="likes-comments-date"> - {moment(like.date).startOf('hour').fromNow()}</span> 
        </Link>
        <hr></hr>
      </div>) )

    let commentsContent = userComments.map((comment, index) => (
      <div key={index}>
        <Link to={`/comments/${comment.post_id}`} className="likes-comments-string">
        <span><img className="likes-comments-img" src={comment.image} alt="" /></span>
        </Link>
        <span className="likes-comments-handle"> <Link className="likes-comments-handle" to={`/profile/${comment.handle}`}> {comment.handle} </Link></span> 
        <span className="likes-comments-generic-text"> commented:</span>        
        <span className="likes-comments-comment"> "{comment.text}"</span> 
        <span className="likes-comments-date"> - {moment(comment.date).startOf('hour').fromNow()}</span> 
        
        <hr></hr>
        </div>) )

    return <div>
        <div className="likes-comments-header">New comments for the past week:</div>
        {commentsContent}
        <div className="likes-comments-header">New likes for the past week:</div>
        {likesContent}
      </div>
  }
}


likesComments.propTypes  = {
  posts: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
  post: state.posts
});


export default connect(mapStateToProps, {})(likesComments)
