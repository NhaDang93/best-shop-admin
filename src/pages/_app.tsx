// React
// ** Next Imports
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';

// ** Loader Import
/* eslint-disable */
import NProgress from 'nprogress';

// ** Emotion Imports
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// ** Config Imports
import { useTheme } from '@mui/material/styles';
import themeConfig from 'src/configs/themeConfig';

// ** Component Imports
import ThemeComponent from 'src/theme/ThemeComponent';
// ** Global css styles
import '@/styles/globals.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/context/settingsContext';

// ** Utils Imports
import { createEmotionCache } from 'src/utils/create-emotion-cache';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** Global css styles
import 'src/styles/globals.css';

// Store
import { Provider } from 'react-redux';
import { StoreWrapper } from 'src/store';
// ** Language
import ApiError from '@/components/common/modals/api-error';
import { AuthProvider } from '@/state/auth/authContext';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import 'src/i18n';
import i18n from 'src/i18n';
import UnAuthLayout from 'src/layouts/UnAuthLayout';
import { AppDispatch } from 'src/store/app-dispatch';

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const AppLayout = ({ Component, Element }: any) => {
  const children = Component?.getLayout ? (
    Component?.getLayout(Element)
  ) : (
    <UnAuthLayout>{Element}</UnAuthLayout>
  );
  return (
    <div>
      {children}
      <ApiError />
    </div>
  );
};

// ** Configure JSS & ClassName
const App = ({ Component, ...rest }: ExtendedAppProps) => {
  const { store, props } = StoreWrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = useTheme();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <SnackbarProvider
          iconVariant={{
            success: <CheckCircleOutlineIcon sx={{ mr: theme.spacing(1) }} />,
            error: <CancelOutlinedIcon sx={{ mr: theme.spacing(1) }} />,
          }}
          maxSnack={3}
        >
          <I18nextProvider i18n={i18n}>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0 , user-scalable=0"
                />
                <meta name="referrer" content="origin-when-cross-origin" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="https://firebasestorage.googleapis.com/v0/b/petpet-ba45b.appspot.com/o/iconShop.png?alt=media&token=52b46b19-edbc-4567-88b6-d63f293a07e9"
                />
                <meta
                  name="keywords"
                  content="Shop chăm sóc và bán thức ăn thú cưng"
                />
                <meta
                  property="og:image"
                  content="https://firebasestorage.googleapis.com/v0/b/petpet-ba45b.appspot.com/o/iconShop.png?alt=media&token=52b46b19-edbc-4567-88b6-d63f293a07e9"
                />
                <meta property="og:image:alt" content="Logo ODALINK" />
                <meta property="og:image:height" content="300" />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta
                  property="og:image:secure_url"
                  content="https://secure.example.com/ogp.jpg"
                />
                <meta property="og:type" content="website" />
              </Head>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => (
                    <ThemeComponent settings={settings}>
                      <AuthProvider>
                        <AppLayout
                          Element={<Component {...pageProps} />}
                          Component={Component}
                        />

                        <AppDispatch />
                      </AuthProvider>
                    </ThemeComponent>
                  )}
                </SettingsConsumer>
              </SettingsProvider>
            </CacheProvider>
          </I18nextProvider>
        </SnackbarProvider>
      </Provider>
    );
  }
};

export default App;
