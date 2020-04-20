import '../../css/navbar.css';
import '../../css/create-edit-profile.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from "classnames";

import { addPost } from '../../actions/postActions'

class PostForm extends Component {


  constructor() {
    super();
    this.state = {
      text: '',
      image: '',
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

    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      image: this.state.image,
      handle: user.handle,
      name: user.name,
      avatar: user.avatar,
      user: user.user,
    }

    this.props.addPost(newPost, this.props.history)
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    } 
  }




/* <input type="email" className={classnames('form-control', {'is-invalid': errors.email})} 
placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange}  /> */

//data-dismiss="modal"

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    
    /* const authLink = (
      <div className="topnav-contanier">
        <div className="topnav">
          <Link className="active" to="/post-feed"><img src={require("../../img/instagram_logo.png")}  alt="logo" className="insta-logo"/></Link>
          <div type="button" className="add-new-post">
            <button className="btn btn-primary button-post" data-toggle="modal" data-target="#exampleModalCenter"><i className="fas fa-plus"></i></button> </div>
          <Link to="/post-feed" aria-hidden="true"><i className="fa fa-home home-btn black" aria-hidden="true"></i></Link>
          <Link to="/likes" className="topnav-like-btn" aria-hidden="true"><i className="fas fa-heart like-btn black" aria-hidden="true"></i></Link>
          <Link to="/profile" ><img src={user.avatar} alt={user.name} className="topnav-avatar"/></Link>
          <a href="" className="topnav-like-btn" aria-hidden="true" onClick={this.onLogoutClick.bind(this)}><i className="fas fa-sign-out-alt logout-btn black" aria-hidden="true"></i></a>
        </div>
      </div>
    ); */


//{isAuthenticated ? authLink : undefined}
    return (
          <div>
            <div className="wrapper-1">
              <div className="wrapper-2">
              <div className="content-main">

                  <div className="main-form">
                    <div className="tab-content" >                
                        <div className="row top-row">
                          <div className="col-3 input-lable-wrapper">
                            <Link to="/profile"><img src={user.avatar} alt={user.handle} className="avatar"/></Link>
                          </div> 
                          <div className="col-9">
                            <div className="username">{user.handle}</div>
                          </div>    
                        </div>
                        
                        <form  onSubmit={this.onSubmit}>
                          <div className="row input-row">
                            <div className="col-3 input-lable-wrapper">
                              <lable className="input-lable" >Image URL</lable> 
                            </div> 
                            <div className="col-9">
                              <input type="text" className={classnames('form-control', {'is-invalid': errors.image})} placeholder="insert image URL" 
                                name="image" value={this.state.image}  onChange={this.onChange}/> 
                                {errors.image && (
                                  <div className="invalid-feedback"> {errors.image}</div>
                                )}
                            </div>
                          </div>
                          <div className="row input-row">
                            <div className="col-3 input-lable-wrapper">
                              <lable className="input-lable" >Username</lable> 
                            </div> 
                            <div className="col-9">
                              <input type="text" className={classnames('form-control', {'is-invalid': errors.text})} placeholder="Caption" name="text"  
                                name="text" value={this.state.text}  onChange={this.onChange}/> 
                                {errors.text && (
                                  <div className="invalid-feedback"> {errors.text}</div>
                                )}
                            </div>
                          </div>
                          <div className="row justify-content-center submit-btn-row">
                            <input type="submit" value="Create Post" className="submit-btn" />
                          </div>
                        </form>
              
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>

    )
  };
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})


export default connect(mapStateToProps, { addPost })(PostForm);


