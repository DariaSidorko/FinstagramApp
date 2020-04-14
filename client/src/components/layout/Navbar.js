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
    //this.props.history.push('//login');
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const guestLink = (
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/feed">Post Feed</Link>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.onLogoutClick.bind(this)}> 
              <img className='rounded-circle' src={user.avatar} alt={user.name} style={{ width: '25px', marginRight: '5px' }} 
              title="you must have a gravatar connected to display an image"/>
              Logout</a>
            </li>
          </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
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
  
          {isAuthenticated ? authLinks : guestLink}
        </div>
      </div>
    </nav>
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