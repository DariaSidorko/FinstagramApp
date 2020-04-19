import axios from 'axios';

import {
  ADD_POST,
  CLEAR_ERRORS,
  SET_ERRORS,
  GET_POSTS,
  POST_LOADING
} from './types';



// Get all the posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('api/posts')
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )

}


// Add new post 
export const addPost = (postData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};


// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
