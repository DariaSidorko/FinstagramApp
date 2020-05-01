import '../../css/navbar.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

import { addPost } from '../../actions/postActions'

class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/login';
  }

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
l

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    } 
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const authLink = (
      <div className="topnav-contanier">
        <div className="topnav">
          <Link className="active" to="/post-feed"><img src={require("../../img/logo-3.png")}  alt="logo" className="insta-logo"/></Link>
          <Link className="add-new-post" to="/create-post"><button className="btn btn-primary button-post"><i className="fas fa-plus"></i></button> </Link>
          <Link to="/post-feed" aria-hidden="true"><i className="fa fa-home home-btn black" aria-hidden="true"></i></Link>
          <Link to="/explore" aria-hidden="true"><i className="fas fa-compass home-btn black" aria-hidden="true"></i></Link>
          <Link to="/likes-comments" className="topnav-like-btn" aria-hidden="true"><i className="fas fa-heart like-btn black" aria-hidden="true"></i></Link>
          <Link to="/dashboard" ><img src={user.avatar} alt={user.name} className="topnav-avatar"/></Link>
          <a href="/" className="topnav-like-btn" onClick={this.onLogoutClick.bind(this)}><i className="fas fa-sign-out-alt logout-btn black" aria-hidden="true"></i></a>
        </div>
      </div>
    );



    return (
       <div>
      {isAuthenticated ? authLink : undefined}
      



</div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser, addPost})(Navbar);

