import axios from 'axios';

const api = axios.create({
  baseURL:'https://carfix1.onrender.com/api',
  withCredentials: true, 
});

export default api;
