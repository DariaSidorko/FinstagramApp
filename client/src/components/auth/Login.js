import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-content">
          <div className="header">
            <img src={require("../../img/instagram_logo.png")} />
          </div>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password" />
          <input type="button" value="Log in" className="btn" />
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