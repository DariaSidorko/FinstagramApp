import { 
  CREATE_PROFILE,
  PROFILE_LOADING,
  GET_PROFILE, 
  GET_PROFILES } from "../actions/types";


const initialState = {
profile: null,
profiles: null,
loading: false,
};
export default function (state = initialState, action){
  switch (action.type){
    case CREATE_PROFILE:
      return{
        ...state, 
        loading:true
      };
    case PROFILE_LOADING:
      return{
        ...state, 
        loading:true
      };
      case GET_PROFILE:
        return{
          ...state,
          loading:false,
          profile: action.payload
        };
        case GET_PROFILES:
          return{
            ...state,
            loading:false,
            profiles: action.payload
          };
          case CLEAR_CURRENT_PROFILE:
            return{
              ...state,
              profile: null,
            };
            default:
              return state;

  }
}