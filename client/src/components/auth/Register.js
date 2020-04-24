import '../../css/register.css';
import React, { Component } from "react";
// import classnames from "classnames";
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import {Link} from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      
    };

 
    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
state = {
  isPasswordShown: false
}
togglePasswordVisibility = () =>{
  const {isPasswordShown} = this.state;
  this.setState ({isPasswordShown :!isPasswordShown});
}
  render() {
    const {isPasswordShown} = this.state;
   

    const { errors } = this.state;
    
    return (
      <div className="wrapper">
      <div className="main-content">
        <div className="header">
          <img alt="logo" src={require("../../img/Instagram_logo.jpg")} />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextFieldGroup 
              placeholder="Full Name"
              name = "name" 
              value = {this.state.name}
              onChange = {this.onChange}
              errors = {errors.name}
            />
            </div>
            <div>
            <TextFieldGroup 
              placeholder="Username"
              name = "handle" 
              value = {this.state.handle}
              onChange = {this.onChange}
              errors = {errors.handle}
            />
          </div>
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
          <i className = "fa fa-eye password-icon" 
          onClick= {this.togglePasswordVisibility} />
             <TextFieldGroup 
              placeholder="Password"
              type = {(isPasswordShown) ? "text": "password"}
              name = "password" 
              value = {this.state.password}
              onChange = {this.onChange}
              errors = {errors.password}
            />
             </div>
        
          <input type="submit" value="Sign up" className="btn" />
        </form>
      </div>
      <div className="sub-content">
          Have an account? <Link className="sub-link" to="/login">Log in</Link>
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