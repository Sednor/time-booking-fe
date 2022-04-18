import axios from '../config/axios';
import { URLS } from '../constants/urls';

export const fetchData = () => {
  return axios.get(`${URLS.BOOK}?size=1000000&page=0`);
};
