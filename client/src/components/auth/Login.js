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


    // **************password visible-invisible**********
    state = {
      isPasswordShown: false
    }
    togglePasswordVisibility = () =>{
      const {isPasswordShown} = this.state;
      this.setState ({isPasswordShown :!isPasswordShown});
    }
    // **************************************************

  render() {
    const {errors} = this.state; 

    // *******************************
    const {isPasswordShown} = this.state;
    // *******************************

    return (
      <div className="wrapper">


        <div id="backgroundCarousel" className="carousel slide carousel-fade" data-ride="carousel">
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
            <div className="password-wrapper">
            <TextFieldGroup 
              placeholder="Password"
              name = "password" 
              type = {(isPasswordShown) ? "text": "password"}
              value = {this.state.password}
              onChange = {this.onChange}
              errors = {errors.password}
            />
            
            <i onClick= {this.togglePasswordVisibility}>
              {isPasswordShown ? 
                <i className = "far fa-eye password-icon-show" /> :
                <i className = "fas fa-eye-slash password-icon-hide" /> 
              } </i>
            
            </div>
          <input type="submit" value="Log in" className="btn-login-register" />

          </form>
          <div className="fogot-pass">
            <Link className="main-link" to="/register">Forgot password?</Link>
          </div>
        
        <div className="sub-content">
            Don't have an account? <Link className="sub-link" to="/register">Sign up</Link>
        </div>
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
