import { useGetUserInfoMutation, useLoginMutation } from '@/apis/auth';
import { PATH, SNACK_BAR_DURATION } from '@/constants';
import { LoginForm } from '@/containers/auth/login/components/LoginForm';
import { dispatch } from '@/store/app-dispatch';
import {
  auth,
  clearAuth,
  loadingApp,
  setLoadingApp,
  updateAuth,
} from '@/store/slices/app';
import { IAuth } from '@/types';
import { Cookies, CookiesKey, responseParams } from '@/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useAuth() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [onLogin, response] = useLoginMutation();
  const [onUserInfo, onUserInfoRes] = useGetUserInfoMutation();
  const [statusCode, setStatusCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const { isReady } = router;
  const authSelector = useSelector(auth);
  const loading = useSelector(loadingApp);

  useEffect(() => {
    dispatch(setLoadingApp(false));
  }, [router?.pathname, isReady]);

  useEffect(() => {
    (async () => {
      const tokenAuth = await Cookies.loadString(CookiesKey.AUTH);
      if (tokenAuth && !router?.pathname.includes(PATH.LOGIN)) {
        getUserInfo?.();
      } else {
        router.push(PATH.LOGIN);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (response?.data) {
        const { data, responseCode, errors, responseMessage }: any =
          response.data;
        if (responseCode === '00') {
          removeParam(PATH.HOME);
          setAuth(data?.token);
          router.push(PATH.DASH_BOARD);
          onSuccess();
          enqueueSnackbar(responseMessage, {
            variant: 'success',
            autoHideDuration: SNACK_BAR_DURATION,
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
        } else {
          dispatch(clearAuth());
          removeAuth();
          onError(responseCode, responseMessage);
          enqueueSnackbar(responseMessage, {
            variant: 'error',
            autoHideDuration: SNACK_BAR_DURATION,
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
        }
        dispatch(setLoadingApp(false));
      }
    })();
  }, [response?.data]);

  const getUserInfo = async () => {
    if (!authSelector?.email) {
      const { responseCode, data, responseMessage } = await onUserInfo(
        responseParams({
          check_token: true,
        })
      ).unwrap();
      if (responseCode === '00') {
        removeParam(PATH.HOME);
        dispatch(updateAuth(data as IAuth));
        onSuccess();
        enqueueSnackbar(responseMessage, {
          variant: 'success',
          autoHideDuration: SNACK_BAR_DURATION,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      } else {
        dispatch(clearAuth());
        removeAuth();
        onError(responseCode, responseMessage ?? '');
        router.push(PATH.LOGIN);
        enqueueSnackbar(responseMessage, {
          variant: 'error',
          autoHideDuration: SNACK_BAR_DURATION,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      }
    }
  };

  function removeParam(path: string) {
    if (router?.pathname === path) {
      router.replace({
        pathname: path,
      });
    }
  }
  const onSuccess = () => {
    setIsValid(true);
    dispatch(setLoadingApp(false));
  };

  const onError = (_statusCode = PATH.PAGE_404, _message = '') => {
    setIsValid(false);
    setStatusCode(_statusCode);
    setMessage(_message);
    dispatch(setLoadingApp(false));
  };

  const setAuth = (data: any) => {
    Cookies.save(CookiesKey.AUTH, data);
  };

  function getAuth() {
    const authSession = Cookies.load(CookiesKey.AUTH) ?? null;

    return authSession;
  }

  const removeAuth = async () => {
    await Cookies.remove(CookiesKey.AUTH);
    dispatch(updateAuth({}));
  };

  const login = async (body?: LoginForm) => {
    dispatch(setLoadingApp(true));

    if (!body) return;
    try {
      await onLogin(
        responseParams({
          ...body,
        })
      )?.unwrap();
    } catch (errorLogin: any | (AxiosError & AxiosResponse)) {
      if (typeof onError === 'function') {
        removeAuth();
        onError(PATH.PAGE_404, 'Server errors');
      }
    }
  };

  const logout = () => {
    removeAuth();
    router.push(PATH.LOGIN);
  };

  return {
    login,
    getAuth,
    setAuth,
    authSelector,
    loading,
    statusCode,
    isValid,
    message,
    logout,
    onUserInfoRes,
  };
}
