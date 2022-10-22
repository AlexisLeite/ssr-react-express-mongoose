import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IRequestConfig {
  axiosConfig?: AxiosRequestConfig;
}

export interface IPostRequestConfig extends IRequestConfig {
  postData?: unknown;
}

const api = new (class Api {
  async get<T>(url: string, config?: IRequestConfig) {
    return axios.get(url, config?.axiosConfig) as Promise<AxiosResponse<T>>;
  }

  async delete<T>(url: string, config?: IRequestConfig) {
    return axios.delete(url, config?.axiosConfig) as Promise<AxiosResponse<T>>;
  }

  async patch<T>(url: string, config?: IPostRequestConfig) {
    return axios.patch(url, config?.postData, config?.axiosConfig) as Promise<AxiosResponse<T>>;
  }

  async post<T>(url: string, config?: IPostRequestConfig) {
    return axios.post(url, config?.postData, config?.axiosConfig) as Promise<AxiosResponse<T>>;
  }
})();

export function makeApiUrl(url: string, parameters?: Record<string, unknown>) {
  const actualParameters = Object.entries(parameters ?? {})
    .map<[string, unknown]>((key, value) => ([String(key), String(value)]))
    .reduce((accumulated, [key, value]) => ({ ...accumulated, [key]: value }), {});

  const searchParams = new URLSearchParams(actualParameters).toString();

  let concatSymbol = '';
  if (searchParams.length > 0) {
    concatSymbol = '&';
    if (!url.includes('?')) concatSymbol = '?';
    if (url.endsWith('?')) concatSymbol = '';
  }

  return `/api/${url}${concatSymbol}${searchParams}`;
}

export default api;
