import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
