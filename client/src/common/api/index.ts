import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../../../store';
import { alertActions } from '../../../store/alertSlice';

export interface IRequestConfig {
  axiosConfig?: AxiosRequestConfig;
}

export interface IPostRequestConfig extends IRequestConfig {
  postData?: unknown;
}

interface IServerError {
  message: string;
}

const api = new (class Api {
  async parseResponse<T>(response: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T> | null> {
    try {
      const result = await response.catch((error) => {
        if (error instanceof AxiosError) {
          store.dispatch(
            alertActions.notify({
              type: 'error',
              message:
                (error.response?.data as IServerError | undefined)?.message ??
                'An error occurred while requesting the server',
            }),
          );
        } else {
          store.dispatch(
            alertActions.notify({
              type: 'error',
              message: 'An error occurred while requesting the server',
            }),
          );
        }
      });

      if (result) return result;
    } catch (e) {
      console.log('e');
      console.error(e);
    }

    return null;
  }

  async get<T>(url: string, config?: IRequestConfig): Promise<AxiosResponse<T> | null> {
    return this.parseResponse(axios.get(url, config?.axiosConfig));
  }

  async delete<T>(url: string, config?: IRequestConfig): Promise<AxiosResponse<T> | null> {
    return this.parseResponse(axios.delete(url, config?.axiosConfig));
  }

  async patch<T>(url: string, config?: IPostRequestConfig): Promise<AxiosResponse<T> | null> {
    return this.parseResponse(axios.patch(url, config?.postData, config?.axiosConfig));
  }

  async post<T>(url: string, config?: IPostRequestConfig): Promise<AxiosResponse<T> | null> {
    return this.parseResponse(axios.post(url, config?.postData, config?.axiosConfig));
  }
})();

export function makeApiUrl(url: string, parameters?: Record<string, unknown>) {
  const actualParameters = Object.entries(parameters ?? {})
    .map<[string, unknown]>((key, value) => [String(key), String(value)])
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
