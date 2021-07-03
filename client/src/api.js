import axios from 'axios';

const API = '/api';

export default axios.create({
  baseURL: API,
});
