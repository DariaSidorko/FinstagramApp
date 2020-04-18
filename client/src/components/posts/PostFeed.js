import '../../css/post-feed.css';


import React, { Component } from 'react'

class PostFeed extends Component {
  render() {
    return (
      <div>
        <div className="post-contanier">
          <div className="row">
            <div className=" col-8 post">
              <div className="post-header">
                  <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533122246/profile-picture.jpg" alt="avatar" />
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
            <div className="col-4">
              <div className="side-bar-header">
                <img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533122246/profile-picture.jpg" alt="avatar" />
                <div className="username">johnjames.21</div>
              </div>     
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PostFeed
