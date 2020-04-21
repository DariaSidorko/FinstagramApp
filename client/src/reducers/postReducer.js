import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  GET_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: []
};

export default function(state = initialState, action) {
  switch (action.type) {
     case POST_LOADING:
      return {
        ...state,
        loading: true
      }; 
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
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
          loading: false
        }
        default:
          return state;
  }
}
