import axios from 'axios';

const setAuthToken = token =>{
  if (token){
    //Apply token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //Delete token from auth header
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;