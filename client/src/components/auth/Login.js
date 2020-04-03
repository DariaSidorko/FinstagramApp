import React, { Component } from 'react'
import axios from "axios";
import classnames from "classnames";

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

    axios.post("/api/users/login", user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }


  render() {
    const {errors} = this.state; 
    return (
      <div className="wrapper">
        <div className="main-content">
          <div className="header">
            <img src={require("../../img/instagram_logo.png")} />
          </div>
          <form onSubmit={this.onSubmit}>
            <input type="email"  className={classnames('form-control', {'is-invalid': errors.email})} placeholder="Email or Password" name="email" value={this.state.email}  onChange={this.onChange}/>
            {errors.email && (
              <div className="invalid-feedback"> {errors.email}</div>
            )}
            <input type="password" className={classnames('form-control', {'is-invalid': errors.password})}  placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            {errors.password && (
              <div className="invalid-feedback"> {errors.password}</div>
            )}
            <input type="submit" value="Log in" className="btn" />
            </form>
          <div className="fogot-pass">
            <a className="main-link" href="#">Forgot password?</a>
          </div>
        </div>
        <div className="sub-content">
            Don't have an account? <a className="sub-link" href="#">Sign up</a>
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

export default Login;