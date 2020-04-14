import React, { Component } from 'react';

import classnames from "classnames";
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      handle: '',
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
    const newUser = {
      email: this.state.email,
      name: this.state.name,
      handle: this.state.handle,
      password: this.state.password,
    }

    this.props.registerUser(newUser, this.props.history)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {errors} = this.state; //SAME AS const errors = this.state.errors; (deconstruction)
    const { user } = this.props.auth;
    return (
      <div className="wrapper">
      <div className="main-content">
        <div className="header">
          <img src={require("../../img/instagram_logo.png")} />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextFieldGroup 
              placeholder="Email Address"
              name = "email" 
              value = {this.state.email}
              onChange = {this.onChange}
              errores = {errors.email}
            />
          </div>
          <div>
            <TextFieldGroup 
              placeholder="Full Name"
              name = "name" 
              value = {this.state.name}
              onChange = {this.onChange}
              errores = {errors.name}
            />
            </div>
            <div>
            <TextFieldGroup 
              placeholder="Username"
              name = "handle" 
              value = {this.state.handle}
              onChange = {this.onChange}
              errores = {errors.handle}
            />
          </div>
          <div>
            <TextFieldGroup 
              placeholder="Password"
              name = "password" 
              value = {this.state.password}
              onChange = {this.onChange}
              errores = {errors.password}
            />
            </div>
          <input type="submit" value="Sign up" className="btn" />
        </form>
      </div>
      <div className="sub-content">
          Have an account? <a className="sub-link" href="#">Log in</a>
      </div>
    </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, {registerUser})(Register);


/* <input type="email" className={classnames('form-control', {'is-invalid': errors.email})} placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange}  />
{errors.email && (
<div className="invalid-feedback"> {errors.email}</div>
)}
<input type="text" className={classnames('form-control', {'is-invalid': errors.name})}  placeholder="Full Name" name="name" value={this.state.name} onChange={this.onChange} />
{errors.name && (
<div className="invalid-feedback"> {errors.name}</div>
)}
<input type="text" className={classnames('form-control', {'is-invalid': errors.handle})}  placeholder="Username" name="handle" value={this.state.handle} onChange={this.onChange} />
{errors.handle && (
<div className="invalid-feedback"> {errors.handle}</div>
)}
<input type="password" className={classnames('form-control', {'is-invalid': errors.password})}  placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
{errors.password && (
<div className="invalid-feedback"> {errors.password}</div>
)} */