// ** MUI Theme Provider
import { ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';

// ** Type Import
import { Settings } from '../context/settingsContext';

// ** Theme Override Imports
import breakpoints from './breakpoints';
import palette from './palette';
import shadows from './shadows';
import spacing from './spacing';

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { mode, themeColor } = settings;

  const themeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontSize: 14,
      fontFamily: [
        'Be VietNam Pro',
        'sans-serif'
      ].join(','),
    },
    shadows: shadows(mode),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6,
    },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
  };

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        // @ts-ignore
        ...themeConfig?.palette?.[themeColor],
      },
    },
  });
};

export default themeOptions;
