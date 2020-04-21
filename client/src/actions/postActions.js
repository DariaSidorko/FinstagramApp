import axios from 'axios';

import {
  ADD_POST,
  CLEAR_ERRORS,
  SET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  GET_POST
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


// Get 1 post by ID
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_POST,
        payload: null
      }))
}


// Add new post 
export const addPost = (postData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res => {
      history.push("/post-feed");
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    })
     .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );  
};


// Add new Comment
export const addComment = (postId,commentData) => dispatch => {
  dispatch(clearErrors());
  console.log("API CALL")
  console.log(postId)
  axios
    .post(`api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
};


// Add like
export const addLike = (id) => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => 
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};


// Remove like
export const removeLike = (id) => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => 
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add bookmark
export const addBookmark = (id) => dispatch => {
  axios
    .post(`/api/posts/bookmark/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};


// Remove bookmark
export const removeBookmark = (id) => dispatch => {
  axios
    .post(`/api/posts/unbookmark/${id}`)
    .then(res => dispatch(getPosts()))
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
