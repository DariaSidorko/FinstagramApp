import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  postLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
     case POST_LOADING:
      return {
        ...state,
        postLoading: true
      }; 
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          postLoading: false
        }
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          postLoading: false
        }
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        }
        default:
          return state;
  }
}
