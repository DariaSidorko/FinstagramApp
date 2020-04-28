
import '../../css/likes-and-comments.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class likesComments extends Component {
  render() {
    const { posts } = this.props;
    //const { profile } = this.props.profiles;
    const { user } = this.props.auth;
    let userLikes = [];
    let userComments = [];
    let obj;
    //console.log("Posts!!!: ", posts);
    //console.log("Posts!!!: ", posts.posts.length);
 

    // Users like
    for (let i=0; i < posts.posts.length; i++){
      if (posts.posts[i].user === user.id){
        for (let j=0; j < posts.posts[i].likes.length; j++){
          
          let days = (moment(posts.posts[i].likes[j].date).startOf('day').fromNow()).split(' '); 
          //console.log("POSTS: ", posts.posts[i].likes[j].user)
          //console.log(temp)
          if (days[0] == 'a' || days[0] < 8){

          let obj = {
              _id:  posts.posts[i].likes[j]._id,
              user:  posts.posts[i].likes[j].user,
              date: posts.posts[i].likes[j].date,
              text: posts.posts[i].text,
              post_id: posts.posts[i]._id,
              image: posts.posts[i].image
            }
            userLikes .push(obj);
          }
        } 

        for (let j=0; j < posts.posts[i].comments.length; j++){     
          let days = (moment(posts.posts[i].comments[j].date).startOf('day').fromNow()).split(' '); 
 
          if (days[0] === 'a' || days[0] < 8){
          
          let obj = {
              _id:  posts.posts[i].comments[j]._id,
              user:  posts.posts[i].comments[j].user,
              date: posts.posts[i].comments[j].date,
              handle: posts.posts[i].comments[j].handle,
              text: posts.posts[i].comments[j].text,
              //text: posts.posts[i].text,
              post_id: posts.posts[i]._id,
              image: posts.posts[i].image
            }
            userComments .push(obj);
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
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    })


    

    //console.log("LIKES: ", userLikes);



    let likesContent = userLikes.map((like, index) => (
      <div key={index} >
        <Link to={`/comments/${like.post_id}`}>
        <span><img className="likes-comments-img" src={like.image} /></span>
        <span>{like.text}</span> 
        <span>- {moment(like.date).startOf('hour').fromNow()}</span> 
        </Link>
        <hr></hr>
      </div>) )

    let commentsContent = userComments.map((comment, index) => (
      <div key={index}>
        <Link to={`/comments/${comment.post_id}`}>
        <span><img className="likes-comments-img" src={comment.image} /></span>
        <span>{comment.text}</span> 
        <span>- {moment(comment.date).startOf('hour').fromNow()}</span> 
        </Link>
        <hr></hr>
        </div>) )

    return <div>
        <p>Likes:</p>
        {likesContent}
        <p>Comments:</p>
        {commentsContent}
      </div>
  }
}


likesComments.propTypes  = {
  posts: PropTypes.array.isRequired,
  //profiles: PropTypes.object.isRequired
};
//(posts.filter(post => profile.followin.filter(follow => follow.user === post.user).length > 0).map(post => <PostItem key={post._id} post={post} />));


const mapStateToProps = state => ({
  //profiles: state.profile,
  auth: state.auth,
  //post: state.posts
});


export default connect(mapStateToProps, {})(likesComments)
