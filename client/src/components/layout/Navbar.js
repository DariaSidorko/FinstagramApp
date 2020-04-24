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

    const { user} = this.props.auth;
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
    console.log(nextProps)
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    } 
  }
  
    render() {
    const { isAuthenticated, user} = this.props.auth;
    
    const authLink = (
      <div className="topnav-contanier">
        <div className="topnav">
          <Link className="active" 
          to="/post-feed">
          <img src={require("../../img/Instagram_logo.jpg")}  
          alt="logo" className="insta-logo"/>
          </Link>
          <Link className="add-new-post" 
          to="/create-post">
          <button className="btn btn-primary button-post">
          <i className="fas fa-plus">
          </i>
          </button>
           </Link>

          <Link to="/profile" 
          aria-hidden="true">
          <i className="fa fa-home home-btn black" 
          aria-hidden="true">
          </i>
          </Link>
          <Link to="/likes" 
          className="topnav-like-btn" 
          aria-hidden="true">
          <i className="fas fa-heart like-btn black" 
          aria-hidden="true">
          </i>
          </Link>
          <Link to="/profile" >
          <img src={user.avatar} 
          alt={user.name} 
          className="topnav-avatar"/>
          </Link>
          <Link to="" 
          className="topnav-like-btn" 
          aria-hidden="true" 
          onClick={this.onLogoutClick.bind(this)}>
          <i className="fas fa-sign-out-alt logout-btn black" 
          aria-hidden="true">
          </i>
          </Link>
        </div>
      </div>
     
    );
    
    return (
      
       <div>
      {isAuthenticated ? authLink : undefined}
             
    <div className="modal fade" 
id="exampleModalCenter" 
tabIndex="-1" 
role="dialog" 
aria-labelledby="exampleModalCenterTitle" 
aria-hidden="true">
  <div 
  className="modal-dialog modal-dialog-centered" 
  role="document">
    <div 
    className="modal-content">
      <div 
      className="modal-header">
        <h5 
        className="modal-title" 
        id="exampleModalCenterTitle">Create New Post
        </h5>
        <button 
        type="button" 
        className="close" 
        data-dismiss="modal" 
        aria-label="Close">
          <span 
          aria-hidden="true">&times;
          </span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={this.onSubmit}>
          <input type="text" 
          className="form-control" 
          placeholder="Insert Image Link"   
            name="image" 
            value={this.state.image}  
            onChange={this.onChange}/> 
          <input type="text" 
          className="form-control" 
          placeholder="Write Caption" 
          name="text" 
          value={this.state.text}  
          onChange={this.onChange}/> 
          <button type="button" 
          className="btn btn-secondary" 
          data-dismiss="modal">Close
          </button>
          <button type="submit" 
          value="submit" 
          className="btn btn-primary" 
          data-dismiss="modal">Post
          </button>
        </form>
      </div>
      <div className="modal-footer">
      </div>
    </div>
  </div>
</div>
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




