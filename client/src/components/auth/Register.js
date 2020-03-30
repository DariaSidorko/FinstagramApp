import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <div className="wrapper">
      <div className="main-content">
        <div className="header">
          <img src={require("../../img/instagram_logo.png")} />
        </div>
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Full Name"/>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password" />
        <input type="button" value="Sign up" className="btn" />

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