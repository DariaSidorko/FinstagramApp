import React, { Component } from 'react'
import {Link} from 'react-router-dom';



class Landing extends Component {
  render() {
    return (
    <div className="landing">
      <div id="backgroundCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/*Photo by Jack Church on Unsplash*/}
            <img className="d-block w-100" src="https://source.unsplash.com/jKGFqL3llv0/1600x900" alt="First slide" />
            </div>
            <div className="carousel-item">
              {/*Photo by Chronis Yan on Unsplash*/}
            <img className="d-block w-100" src="https://source.unsplash.com/aDFJ5Fm50IA/1600x900" alt="Second slide" />
            </div>
            <div className="carousel-item">
              {/*Photo by Anders Jildén on Unsplash*/}
              <img className="d-block w-100" src="https://source.unsplash.com/uwbajDCODj4/1600x900"
              alt="Third slide" />
            </div>
          </div>
          </div>



      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector
              </h1>
              <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
              <Link to="/login" className="btn btn-lg btn-light">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>  
    )
  }
}

export default Landing;