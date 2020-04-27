import axios from "axios";

import { 
  GET_PROFILE, 
  SET_ERRORS,
  PROFILE_LOADING
 } from './types'



//Get profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};


// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  console.log("Handle in Action: ",handle)
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>{
      console.log("RES: ", res)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    }
    )
    .catch(err =>{
      console.log("ERR: ", err)
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    }
    );
};



// follow
export const follow = (id, handle) => dispatch => {
  axios
    .post(`/api/profile/follow/${id}`)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err => 
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};


// Remove like
export const unfollow = (id, handle) => dispatch => {
  axios
    .post(`/api/profile/unfollow/${id}`)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err => 
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};



// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


//Set / update profile
export const updateProfile = (userData, history) => dispatch => {
  axios.post("/api/profile", userData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  )  
}