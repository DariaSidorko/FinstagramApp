import '../../css/navbar.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
    console.log(this.props.history);
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;
    
/*     const guestLink = (
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
    ); */
    
    const authLink = (
      <div className="topnav-contanier">
        <div className="topnav">
          <Link className="active" to="/feed"><img src={require("../../img/instagram_logo.png")}  alt="logo" className="insta-logo"/></Link>
          <Link to="/feed" aria-hidden="true"><i className="fa fa-home home-btn black" aria-hidden="true"></i></Link>
          <Link to="/likes" className="topnav-like-btn" aria-hidden="true"><i className="fas fa-heart like-btn black" aria-hidden="true"></i></Link>
          <Link to="/profile" ><img src={user.avatar} alt={user.name} className="topnav-avatar"/></Link>
          <Link to="/login" className="topnav-like-btn" aria-hidden="true" onClick={this.onLogoutClick.bind(this)}><i className="fas fa-sign-out-alt logout-btn black" aria-hidden="true"></i></Link>
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
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);


/*
<div class="topnav-contanier">
  <div class="topnav">
    <Link class="active" to="/feed"><img src="instagram_logo.png" alt="logo" class="insta-logo"/></Link>
    <Link to="/search-result" class="" aria-hidden="true"><input class="topnav-search" placeholder="Search" ></Link>
    <Link to="/feed" class="topnav-home-btn" aria-hidden="true"><i class="fa fa-home home-btn black" aria-hidden="true"></i></Link>
    <Link to="/likes" class="topnav-like-btn" aria-hidden="true"><i class="fas fa-heart like-btn black" aria-hidden="true"></i></Link>
    <Link to="/settings" onClick={this.onLogoutClick.bind(this)}><img src="{user.avatar}" alt={user.name} class="topnav-avatar"/></a>
    <Link to="/likes" class="topnav-like-btn" aria-hidden="true"><i class="fal fa-sign-out like-btn black" aria-hidden="true"></i></Link>
  </div>
</div>

*/

/*       <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">DevConnector</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles"> Developers
              </Link>
            </li>
          </ul>
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/feed">Post Feed</Link>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/login" onClick={this.onLogoutClick.bind(this)}> 
              <img className='rounded-circle' src={user.avatar} alt={user.name} style={{ width: '25px', marginRight: '5px' }} 
              title="you must have a gravatar connected to display an image"/>
              Logout</a>
            </li>
          </ul>
          </div>
      </div>
    </nav> 
    
    
    <Link to="/search-result" className="" aria-hidden="true"><input className="topnav-search" placeholder="Search" /></Link>
    
    */