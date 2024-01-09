import { IError } from '@/types';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { dispatch } from 'src/store/app-dispatch';
import { setApiError } from 'src/store/slices/app';
import { Cookies, CookiesKey, LanguageEnum, handleAxios } from 'src/utils';

const BASE_URL = process.env.NEXT_PUBLIC_HOST_API;
const TIME_OUT_API = parseInt(process.env.TIME_OUT_API ?? '0', 10);

const Language: Record<LanguageEnum, string> = {
  vi_VN: 'vi',
  en_US: 'en',
  ko_KR: 'ko',
};

export const axiosBaseQuery =
  (
    baseUrl = BASE_URL || ''
  ): BaseQueryFn<{
    url?: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method, data, params }) => {
    const auth = await Cookies.load(CookiesKey.AUTH);
    const lang: LanguageEnum =
      (await Cookies.load(CookiesKey.LANGUAGE)) ?? LanguageEnum.en_US;
    try {
      const defaultConfig: AxiosRequestConfig = {
        baseURL: baseUrl,
        timeout: TIME_OUT_API,
        headers: {
          'Content-Type': 'application/json',
          // TODO: oauth2 & lang
          Authorization: `Bearer ${auth}`,
          locale: Language[lang],
        },
      };
      const result = (await Axios.request({
        ...defaultConfig,
        method,
        data,
        params,
        url: `${baseUrl + url}`,
      })) as AxiosRequestConfig;
      return handleAxios(result as AxiosError & AxiosResponse);
    } catch (axiosError) {
      const err = axiosError as AxiosError & AxiosResponse;
      const code = err.response?.status;
      /**
       * Dispatch api error code to store
       * Open ApiError modal
       * Just show error with POST method
       */
      if (method === 'POST') {
        dispatch(setApiError({ code } as IError));
      }
      return handleAxios(err);
    }
  };
