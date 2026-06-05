import axios, { type AxiosRequestConfig } from 'axios';
import { ENV } from '../configs';

export function useAxios(config: AxiosRequestConfig = {}) {
  return axios.create({
    baseURL: ENV.API_URL,
    ...config,
  });
}
