import axios from '../config/axios';
import { URLS } from '../constants/urls';

export const book = (data) => {
  return axios.post(URLS.BOOK, { ...data });
};
