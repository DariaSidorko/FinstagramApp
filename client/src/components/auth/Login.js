import '../../css/register-login.css';

import React, { Component } from 'react'
//import classnames from "classnames";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/post-feed');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/post-feed');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }


  render() {
    const {errors} = this.state; 
    return (
      <div className="wrapper">
        <div className="main-content">
          <div className="header">
            <img alt="logo" src={require("../../img/instagram_logo.png")} />
          </div>
          <form onSubmit={this.onSubmit}>
            <div>
            <TextFieldGroup 
              placeholder="Email Address"
              name = "email" 
              value = {this.state.email}
              onChange = {this.onChange}
              errors = {errors.email}
            />
            </div>
            <div>
            <TextFieldGroup 
              placeholder="Password"
              name = "password" 
              value = {this.state.password}
              onChange = {this.onChange}
              errors = {errors.password}
            />
            </div>
            <input type="submit" value="Log in" className="btn" />
          </form>
          <div className="fogot-pass">
            <Link className="main-link" to="/register">Forgot password?</Link>
          </div>
        </div>
        <div className="sub-content">
            Don't have an account? <Link className="sub-link" to="/register">Sign up</Link>
        </div>
      </div>
/*       <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form action="dashboard.html">
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div> */
  
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
