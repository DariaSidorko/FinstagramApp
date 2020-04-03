import React, { Component } from 'react';
import axios from "axios";
import classnames from "classnames";

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

    axios.post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const {errors} = this.state; //SAME AS const errors = this.state.errors; (deconstruction)

    return (
      <div className="wrapper">
      <div className="main-content">
        <div className="header">
          <img src={require("../../img/instagram_logo.png")} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="email" className={classnames('form-control', {'is-invalid': errors.email})} placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange}  />
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
          )}
          <input type="submit" value="Sign up" className="btn" />
        </form>
      </div>
      <div className="sub-content">
          Have an account? <a className="sub-link" href="#">Log in</a>
      </div>
    </div>
/*       <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form action="create-profile.html">
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" />
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

export default  Register;