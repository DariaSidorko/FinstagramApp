import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS
} from '../actions/types';

const initialState = {
  post: {}
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
          payload: action.payload,
          loading: true
        }
      case ADD_POST:
        return {
          ...state,
          payload: [action.payload, ...state.posts]
        };
        default:
          return state;
  }
}
