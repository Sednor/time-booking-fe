import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  responseType: 'json',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default AxiosInstance;
