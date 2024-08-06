import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Accept: 'application/json',
    'Content-Language': 'es',
    'Content-Type': 'application/json',
    'WEB-Accept-Charset': 'utf-8'
  },
  timeout: 30000
});

export default axiosInstance;
