import {
  GET_PROFILE,
  PROFILE_LOADING,
} from '../actions/types';

const initialState = {
  profile: null,
  profileLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false
      };
      default:
      return state;
    }
  }