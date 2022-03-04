// axios
import axios from 'axios';

let instance = axios.create({
  baseURL: `http://localhost:8000`,
});

instance.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem('token'));
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
