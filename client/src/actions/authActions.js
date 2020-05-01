import {SET_CURRENT_USER, SET_ERRORS} from './types'
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/users/register", userData)
  .then(res => history.push('/login'))
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  )  
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    const { token } = res.data;
    // save to local storage
    localStorage.setItem('jwtToken', token);
    // set token to axios auth header
    setAuthToken(token);
    // Decode the token to get the user data
    const decoded = jwt_decode(token);
    // Dispatch set_current_user
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  })
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
    )
}

//Logout user action

export const  logoutUser = () => dispatch => {
  //Remove from localstorage
  localStorage.removeItem('jwtToken');
  localStorage.clear();
  //remove from auth header
  setAuthToken(false);
  // clean redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
}
