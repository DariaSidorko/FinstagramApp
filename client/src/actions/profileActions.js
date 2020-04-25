import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER, 
  SET_ERRORS

} from './types';

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile/', profileData)
    .then(res => history.push(`/profile/handle/${res.data.handle}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
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
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};


// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};



// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
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
    .post(`/api/posts/unlike/${id}`)
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