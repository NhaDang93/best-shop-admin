// ** Type Imports
import { PaletteMode } from '@mui/material';
import { ThemeColor } from 'src/layouts/types';

const DefaultPalette = (mode: PaletteMode, themeColor: ThemeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65';
  const darkColor = '231, 227, 252';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#2196F3';
    }
    if (themeColor === 'secondary') {
      return '#9C9FA4';
    }
    if (themeColor === 'success') {
      return '#40B65F';
    }
    if (themeColor === 'error') {
      return '#F46A6A';
    }
    if (themeColor === 'warning') {
      return '#FFCF5C';
    }
    if (themeColor === 'cyan') {
      return '#2196F3';
    }
    return '#6ACDFF';
  };

  return {
    customColors: {
      dark: darkColor,
      darkBg: '#282A42',
      light: lightColor,
      lightBg: '#F7F7F9',
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759',
      colorCyan: '#2196F3',
      summaryBg: 'rgba(243, 242, 247, 0.8)',
      tableText: '#908BA5',
      summaryTitleColor: '#908BA5',
      tableBorder: '#EBE9F1',
      customerStatus: {
        active: '#40B65F',
        inactive: '#F46A6A',
        deleted: '#BDBDBD',
      },
      tableBorderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: '0px 4px 24px rgba(0 0 0, 0.06)',
    },
    common: {
      black: '#000',
      white: '#FFF',
    },
    mode,
    primary: {
      light: '#2196F3',
      main: '#2196F3',
      dark: '#2196F3',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: '#FFF',
    },
    success: {
      light: '#40B65F',
      main: '#40B65F',
      dark: '#40B65F',
      contrastText: '#FFF',
    },
    error: {
      light: '#F46A6A',
      main: '#F46A6A',
      dark: '#F46A6A',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF',
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#F4F4F4',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030',
    },
    text: {
      primary: `#6E6B7B`,
      secondary: `#B9B9C3`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFF' : '#312D4B',
      default: mode === 'light' ? '#F9FAFC' : '#28243D',
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  };
};

export default DefaultPalette;
