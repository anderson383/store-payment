import axios from 'axios';

console.log(process.env.REACT_APP_URL_BACKEND, 'process.env.REACT_URL_BACKEND')
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    Accept: 'application/json',
    'Content-Language': 'es',
    'Content-Type': 'application/json',
    'WEB-Accept-Charset': 'utf-8'
  },
  timeout: 30000
});

export default axiosInstance;
