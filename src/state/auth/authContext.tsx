import { IError, LoginForm } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLoginMutation } from 'src/apis';
import { useAppSelector } from 'src/hooks/useStore';
import { dispatch } from 'src/store/app-dispatch';
import { setExpiredToken } from 'src/store/slices/app';
import { Cookies, CookiesKey, api, responseParams } from 'src/utils';

export interface IAuthContext {
  authenticated: boolean;
  login: (body: LoginForm, onSuccess: () => void, onError: () => void) => void;
  logOut: () => void;
  errorsFormLogin: IError[];
  setErrorsFormLogin: (errorsFormLogin: IError[]) => void;
  isVerifiedUsername: boolean;
  error5xx: IError;
  setError5xx: (error5xx: IError) => void;
}

interface IAuthProviderProps {
  children: any;
}

const defaultValue: IAuthContext = {
  authenticated: false,
  login: () => undefined,
  logOut: () => Promise,
  errorsFormLogin: [],
  setErrorsFormLogin: () => Promise,
  isVerifiedUsername: false,
  error5xx: {},
  setError5xx: () => undefined,
};

const AuthContext = createContext<IAuthContext>(defaultValue);

const unAuthRequired = ['login', 'register', 'forgot-password'];
const saleRequired = ['/'];

const AuthProvider: React.FC<IAuthProviderProps> = (props) => {
  const { children } = props;
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(
    defaultValue.authenticated
  );
  const isAdminExits = unAuthRequired.find((x) => router.pathname.includes(x));
  const isSaleExits = saleRequired.find((x) => router.pathname.includes(x));

  const [isLogin, setIsLogin] = useState(true);

  const [error5xx, setError5xx] = useState<IError>({});

  const [errorsFormLogin, setErrorsFormLogin] = useState(
    defaultValue.errorsFormLogin
  );
  const [isVerifiedUsername, setIsVerifiedUsername] = useState<boolean>(false);

  const [loadingCookies, setLoadingCookies] = useState(
    defaultValue.authenticated
  );

  const [onLogin, response] = useLoginMutation();

  const isExpiredToken = useAppSelector((x) => x.app.isExpiredToken);

  useEffect(() => {
    (async () => {
      if (isExpiredToken) {
        await logOut();
        router.push('/login').then(() => setIsLogin(false));
        dispatch(setExpiredToken(false));
      }
    })();
  }, [isExpiredToken]);

  useEffect(() => {
    (async () => {
      if (authenticated) {
        if (isAdminExits) {
          router.push('/').then();
        }
      } else if (!isAdminExits) {
        router.push('/login').then();
      }
    })();
  }, [authenticated]);

  useEffect(() => {
    (async () => {
      const auth = await Cookies.loadString(CookiesKey.AUTH);
      if (auth) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoadingCookies(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (response?.data) {
        const { success, errors }: any = response.data;
        if (success) {
          setErrorsFormLogin(defaultValue.errorsFormLogin);
          await Cookies.save(CookiesKey.AUTH, response.data?.data);

          setAuthenticated(true);
        } else {
          setErrorsFormLogin(errors ?? []);
        }
      }
    })();
  }, [response?.data]);

  const login = async (
    body: LoginForm,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      await onLogin(responseParams({ ...body })).unwrap();
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (errorLogin: any | (AxiosError & AxiosResponse)) {
      setError5xx({
        message: errorLogin?.message ?? '',
        code: Number(errorLogin?.code),
      });
      if (typeof onError === 'function') {
        onError();
      }
    }
  };

  const logOut = async () => {
    await Cookies.remove(CookiesKey.AUTH);
    setAuthenticated(false);
    dispatch(api.util.resetApiState());
  };

  const authSetting = useMemo(
    () => ({
      authenticated,
      login,
      logOut,
      errorsFormLogin,
      setErrorsFormLogin,
      setIsVerifiedUsername,
      isVerifiedUsername,
      error5xx,
      setError5xx,
    }),
    [authenticated, errorsFormLogin, isVerifiedUsername, error5xx]
  );

  if (!loadingCookies) {
    return null;
  }

  return (
    <AuthContext.Provider value={authSetting}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
