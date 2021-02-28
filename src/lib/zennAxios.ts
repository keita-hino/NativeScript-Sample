import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

const API_URL = 'https://api.zenn.dev'

export const createZennAxios = (opt?: AxiosRequestConfig) => {
  const option = opt || {};
  const zennAxios = axios.create(option);
  zennAxios.defaults.baseURL = API_URL

  // zennAxios.defaults.headers.common = {
  //   'X-Requested-With': 'XMLHttpRequest',
  // };

  return zennAxios as AxiosInstance & {
    get<T = any>(url: string): AxiosPromise<T>;
  };
};

export default createZennAxios();
