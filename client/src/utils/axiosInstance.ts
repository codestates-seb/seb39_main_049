import axios, { AxiosRequestConfig } from 'axios';
import { getAccessWithRefresh } from '../api/User';
import { getAccessToken } from './cookies';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers!.Authorization) {
      config.headers!.Authorization = `${getAccessToken()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === 'ACCESS TOKEN EXPIRED'
    ) {
      const newAccessToken = await getAccessWithRefresh();
      if (newAccessToken) {
        error.config.headers['Authorization'] = `${newAccessToken}`;
        return axiosInstance.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
