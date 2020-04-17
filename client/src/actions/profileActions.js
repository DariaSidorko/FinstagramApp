
import { GET_PROFILE, SET_ERRORS } from './types'
import axios from "axios";

//Get profile
export const getCurrentProfile = () => dispatch => {
  //dispatch(setProfileLoading());
  console.log('action is on!')
  axios
    .get('/api/profile')
    .then(res => {
      console.log("data is here: ", res.data)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};



//Set update profile
export const updateProfile = (userData, history) => dispatch => {
  axios.post("/", userData)
  .then(res => history.push('/profile'))
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  )  
}