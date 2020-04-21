
import '../../css/comments-page.css';

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'mongoose';
import PropTypes from 'prop-types';

import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/postActions'




 class CommentsPage extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }



  render() {
    return (
      <div>
        <div className="comments-wrapper">
            <div className="comments-wrapper-content">
              <div className="comments-main-content">

                    <div className="tab-content " > 
                      <div className="row">
                      <div className="col-7 ">
                        <img className="comments-image" src="https://images.unsplash.com/photo-1531019136844-d1bdacc942b0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9" alt="" />
                      </div>               

                      <div className="col-5 comments-side-wrapper">
                          <Link to="/profile"><img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="img" className="avatar"/></Link>
                          <div className="username">username</div>
                          <div className="name">name</div>
                          <div className="overflow-auto comments-scrolling">
                            Kal Academy Web Development Bootcamp Lecture - Cohort 6Sunday, April 19⋅10:00 – 11:00amWeekly on Sunday, Saturday, 32 times2757 152nd Ave NE, Redmond, WA 98052
                            17 guests17 awaitingDescription:Hello all,Blocking your calendar for bootcamp lecture time.ThanksKal
                            Kal Academy Web Development Bootcamp Lecture - Cohort 6Sunday, April 19⋅10:00 – 11:00amWeekly on Sunday, Saturday, 32 times2757 152nd Ave NE, Redmond, WA 98052
                            17 guests17 awaitingDescription:Hello all,Blocking your calendar for bootcamp lecture time.ThanksKal
                            Kal Academy Web Development Bootcamp Lecture - Cohort 6Sunday, April 19⋅10:00 – 11:00amWeekly on Sunday, Saturday, 32 times2757 152nd Ave NE, Redmond, WA 98052
                            17 guests17 awaitingDescription:Hello all,Blocking your calendar for bootcamp lecture time.ThanksKal
                            Kal Academy Web Development Bootcamp Lecture - Cohort 6Sunday, April 19⋅10:00 – 11:00amWeekly on Sunday, Saturday, 32 times2757 152nd Ave NE, Redmond, WA 98052
                            17 guests17 awaitingDescription:Hello all,Blocking your calendar for bootcamp lecture time.ThanksKal
                          </div>       
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
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default (CommentsPage);

//connect(mapStateToProps, { getPost })



