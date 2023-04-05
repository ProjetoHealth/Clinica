import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SSR_API,
});

export default api;