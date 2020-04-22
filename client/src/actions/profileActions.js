import axios from "axios";

import { 
  GET_PROFILE, 
  SET_ERRORS,
  PROFILE_LOADING
 } from './types'



//Get profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  console.log("got here")
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


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


//Set update profile
export const updateProfile = (userData, history) => dispatch => {
  axios.post("/api/profile", userData)
  .then(res => history.push('/profile'))
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  )  
}