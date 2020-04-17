
import '../../css/create-edit-profile.css';

import React, { Component } from 'react'
import { connect } from 'react-redux'

import classnames from "classnames";
import {Link} from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'


export class CreateEditProfile extends Component {


  constructor() {
    super();
    this.state = {
      name: '',
      website: '',
      bio: '',
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
    const userData = {
      name: this.state.name,
      website: this.state.website,
      bio: this.state.bio,
    }

    this.props.updateProfile(userData, this.props.history)
  }


/* <input type="email" className={classnames('form-control', {'is-invalid': errors.email})} 
placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange}  /> */
  render() {
    const { user } = this.props.auth;

    return (
      <div className="wrapper-1">
        <div className="wrapper-2">
        <div className="content-main">


          <div className="row">
            <div className="col-3 side-bar">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Edit Profile</a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Change Password</a>
              </div>
            </div>
            <div className="col-8 main-form">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  
                  <div className="row top-row">
                    <div className="col-3 input-lable-wrapper">
                      <Link to="/profile" ><img src={user.avatar} alt={user.name} className="avatar"/></Link>
                    </div> 
                    <div className="col-9">
                      <div className="username">{user.handle}</div>
                      <div className="username-disc">to change your profile picture please use gravatar.com</div>
                    </div>    
                  </div>
                  
                  
                  <form >
                    <div className="row input-row">
                      <div className="col-3 input-lable-wrapper">
                        <lable className="input-lable" >Name</lable> 
                      </div> 
                      <div className="col-9">
                        <input type="email" className="form-control" placeholder={ user.name && user.name || ""} name="email" disabled/> 
                      </div>
                    </div>
                    <div className="row input-row">
                      <div className="col-3 input-lable-wrapper">
                        <lable className="input-lable" >Username</lable> 
                      </div> 
                      <div className="col-9">
                        <input type="email" className="form-control" placeholder={ user.name && user.name || ""} name="email" disabled/> 
                      </div>
                    </div>
                    <div className="row input-row">
                      <div className="col-3 input-lable-wrapper">
                        <lable className="input-lable" >Website</lable> 
                      </div> 
                      <div className="col-9">
                        <input type="email" className="form-control" placeholder={ user.website && user.website || ""}  name="email" /> 
                      </div>
                    </div>
                    <div className="row input-row">
                      <div className="col-3 input-lable-wrapper">
                        <lable className="input-lable" >bio</lable> 
                      </div> 
                      <div className="col-9">
                        <input type="email" className="form-control" placeholder={ user.bio && user.bio || ""}  name="email" /> 
                      </div>
                    </div>
                  </form>
                  <div className="row justify-content-center submit-btn-row">
                  <input type="submit" value="Submit" className="submit-btn" />
                  </div>
                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                
              </div>
            </div>
          </div>



        </div>
        </div>
      </div>
  
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CreateEditProfile);




            /* {errors.email && (
          <div className="invalid-feedback"> {errors.email}</div>)} 
          
          
                    <input type="email" className='form-control'
            placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange}  />
            */