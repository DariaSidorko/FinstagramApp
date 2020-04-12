import axios from 'axios'; 

const setAuthToken = token =>{
  if (token) {
    // Apply token to every request
    axios.defaults.header.common['Authorization'] = token;
  } else {
    // Delete token from header
    delete axios.defaults.header.common['Authorization'];
  }
} ;

export default setAuthToken;