import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS
} from '../actions/types';

const initialState = {
  posts: []
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
        default:
          return state;
  }
}
