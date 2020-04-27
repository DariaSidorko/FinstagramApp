import axios from 'axios';

import {
  ADD_POST,
  CLEAR_ERRORS,
  SET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  GET_POST,
  DELETE_POST
} from './types';



// Get all the posts
export const getPosts = () => dispatch => {
  console.log("Got Here")
  dispatch(setPostLoading());
  console.log(setPostLoading())
  axios
    .get('api/posts')
    .then(res => {
      console.log("RES: ", res)
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    }
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



// Get bookmarked posts
/* export const getBookmarkedPosts = () => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts/bookmarks")
    .then(res =>
      dispatch({
        type: GET_BOOKMARKED_POSTS,
        payload: res.data
      }))
}
 */

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



// Delet post
export const deletePost = (postId, commentId) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
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



// Add new Comment
export const addComment = (postId,commentData) => dispatch => {
  dispatch(clearErrors());
  console.log("output: ", postId, commentData)
  axios
    .post(`api/posts/comment/${postId}`, commentData)
    .then(res => {
      console.log("Calling")
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


// Delet comment
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch(clearErrors());
  console.log("Calling")
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
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
