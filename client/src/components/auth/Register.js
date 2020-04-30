import '../../css/register-login.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
   // **********visible-invisible password*******
   state = {
    isPasswordShown: false
  }
  togglePasswordVisibility = () =>{
    const {isPasswordShown} = this.state;
    this.setState ({isPasswordShown :!isPasswordShown});
  }

  // **********visible-invisible password*******

  render() {
    const {errors} = this.state; //SAME AS const errors = this.state.errors; (deconstruction)
    // **********visible-invisible password*******
    const {isPasswordShown} = this.state;
    // **********visible-invisible password*******
    return (
    
      <div className="wrapper">


        <div id="backgroundCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#backgroundCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#backgroundCarousel" data-slide-to="1"></li>
            <li data-target="#backgroundCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
             
              {/*Photo by Muhd Asyraaf on Unsplash*/}
              <img className="d-block w-100 img-size" src="https://source.unsplash.com/9B-y0oNTbXo/1920x1080" alt="First slide" />
              </div>
              <div className="dark-overlay"></div>
              <div className="carousel-item">
                {/*Photo by Luis Alfonso Orellana on Unsplash*/}
              <img className="d-block w-100 img-size" src="https://source.unsplash.com/WjIB-6UxA5Q/1920x1080" alt="Second slide" />
              </div>
              <div className="dark-overlay"></div>
              <div className="carousel-item">
                {/*Photo by Anders Jildén on Unsplash*/}
                <img className="d-block w-100 img-size" src="https://source.unsplash.com/uwbajDCODj4/1920x1080"
                alt="Third slide" />
                <div className="dark-overlay"></div>
            </div>
          </div>
          </div>

          
      <div className="main-content">
        <div className="header">
          <img className="header-cover" alt="logo" src={require("../../img/logo-3.png")} />
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
          {/**********visible-invisible password*******/}
          <div>
          <i className = "fa fa-eye password-icon" 
          onClick= {this.togglePasswordVisibility} />
          <TextFieldGroup 
            placeholder="Password"
            name = "password" 
            type = {(isPasswordShown) ? "text": "password"}
            value = {this.state.password}
            onChange = {this.onChange}
            errors = {errors.password}
          />
          </div>
          {/**********visible-invisible password*******/}

          <input type="submit" value="Sign up" className="btn-login-register" />

        </form>
        <div className="fogot-pass">
        <Link className="main-link" to="/register">Forgot password?</Link>
      </div>
      
      <div className="sub-content">
          Have an account? <Link className="sub-link" to="/login">Log in</Link>
      </div>
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


