// React
// ** Next Imports
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';

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
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SnackbarProvider } from 'notistack';
import { I18nextProvider } from 'react-i18next';
// ** react date range style
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import ApiError from 'src/components/common/modals/api-error';
import 'src/i18n';
import i18n from 'src/i18n';
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
  const router = useRouter();

  const children = Component?.getLayout ? (
    Component?.getLayout(Element)
  ) : (
    <div>{Element}</div>
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
              <title>{`${themeConfig.templateName}`}</title>
              <meta
                name="description"
                content={`${themeConfig.templateName} `}
              />
              <meta name="keywords" content="" />
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeComponent settings={settings}>
                    <AppLayout
                      Element={<Component {...pageProps} />}
                      Component={Component}
                    />
                    <AppDispatch />
                  </ThemeComponent>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </CacheProvider>
        </I18nextProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
