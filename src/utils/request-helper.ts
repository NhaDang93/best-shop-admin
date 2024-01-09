import { AxiosError, AxiosResponse } from 'axios';
import { translate } from 'src/i18n/translate';
import { dispatch } from 'src/store/app-dispatch';
import { setExpiredToken } from 'src/store/slices/app';

export const SUCCESS_NETWORK_CODE = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 403;
export const STATUS_TIME_OUT = 'ECONNABORTED';
export const CODE_TIME_OUT = 408;

export interface IError {
  field?: string;
  message?: string;
  code?: number;
}

export interface ResponseBase<T = any> {
  code: number;
  message?: string | null;
  data?: T | any;
  success: boolean;
  errors?: IError[];
  current_page?: number;
  per_page?: string;
  last_page?: number;
  total?: number;
  responseCode?: string;
  responseMessage?: string;
}

export interface RequestBase {
  search?: number;
  page?: number;
  limit?: string | null;
  order?: 'asc' | 'desc';
  order_by?: string;
}

const handleData = (response: ResponseBase) => {
  if (response?.code === SUCCESS_NETWORK_CODE) {
    return { data: response };
  }
  return { error: response };
};

export const handleAxios = (
  data: AxiosError & AxiosResponse
): { data: ResponseBase } | { error: ResponseBase } => {
  if (data?.code === STATUS_TIME_OUT) {
    // timeout
    return handleApi(CODE_TIME_OUT, data?.response?.data);
  }
  // success
  if (data?.data) {
    return handleApi(data?.status, data);
  }
  // error
  if (data?.response) {
    if (data.response.status === RESULT_CODE_PUSH_OUT) {
      dispatch(setExpiredToken(true));
    }
    return handleApi(data?.response?.status, data?.response?.data);
  }
  return handleApi(ERROR_NETWORK_CODE);
};

export const handleApi = (status: number, data?: any) => {
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        message: '',
        data: data || null,
        success: false,
      });
    case 200:
      return handleData({
        code: status,
        ...data?.data,
      });
    case 400:
      return handleData({
        code: status,
        message: translate('error:400'),
        data: data || null,
        success: false,
      });
    case 401:
      return handleData({
        code: status,
        message: translate('error:401'),
        data: data || null,
        success: false,
      });
    case 402:
      return handleData({
        code: status,
        message: translate('error:402'),
        data: data || null,
        success: false,
      });
    case 403:
      return handleData({
        code: status,
        message: translate('error:403'),
        data: data || null,
        success: false,
      });
    case 404:
      return handleData({
        code: status,
        message: translate('error:404'),
        data: data || null,
        success: false,
      });
    case 405:
      return handleData({
        code: status,
        message: translate('error:405'),
        data: data || null,
        success: false,
      });
    case 406:
      return handleData({
        code: status,
        message: translate('error:406'),
        data: data || null,
        success: false,
      });
    case 407:
      return handleData({
        code: status,
        message: translate('error:407'),
        data: data || null,
        success: false,
      });
    case 408:
      return handleData({
        code: status,
        message: translate('error:408'),
        data: data || null,
        success: false,
      });

    case 409:
      return handleData({
        code: status,
        message: translate('error:409'),
        data: data || null,
        success: false,
      });
    case 410:
      return handleData({
        code: status,
        message: translate('error:410'),
        data: data || null,
        success: false,
      });

    case 411:
      return handleData({
        code: status,
        message: translate('error:411'),
        data: data || null,
        success: false,
      });
    case 412:
      return handleData({
        code: status,
        message: translate('error:412'),
        data: data || null,
        success: false,
      });

    case 413:
      return handleData({
        code: status,
        message: translate('error:413'),
        data: data || null,
        success: false,
      });
    case 414:
      return handleData({
        code: status,
        message: translate('error:414'),
        data: data || null,
        success: false,
      });
    case 415:
      return handleData({
        code: status,
        message: translate('error:415'),
        data: data || null,
        success: false,
      });
    case 416:
      return handleData({
        code: status,
        message: translate('error:416'),
        data: data || null,
        success: false,
      });
    case 417:
      return handleData({
        code: status,
        message: translate('error:417'),
        data: data || null,
        success: false,
      });
    case 500:
      return handleData({
        code: status,
        message: translate('error:500'),
        data: data || null,
        success: false,
      });
    case 501:
      return handleData({
        code: status,
        message: translate('error:501'),
        data: data || null,
        success: false,
      });
    case 502:
      return handleData({
        code: status,
        message: translate('error:502'),
        data: data || null,
        success: false,
      });
    case 503:
      return handleData({
        code: status,
        message: translate('error:503'),
        data: data || null,
        success: false,
      });
    case 504:
      return handleData({
        code: status,
        message: translate('error:504'),
        data: data || null,
        success: false,
      });
    case 505:
      return handleData({
        code: status,
        message: translate('error:505'),
        data: data || null,
        success: false,
      });

    default:
      if (status > 503) {
        return handleData({
          code: status,
          message: 'Server down',
          data: data || null,
          success: false,
        });
      }
      if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          message: 'Error request',
          data: data || null,
          success: false,
        });
      }
      return handleData({
        code: status,
        message: 'Error on handle',
        data: data || null,
        success: false,
      });
  }
};
