// ** MUI Imports
import { Theme } from '@mui/material/styles';

// ** Theme Config Imports
import themeConfig from '../../configs/themeConfig';

const Button = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 400,
        borderRadius: 5,
        lineHeight: 1.71,
        letterSpacing: '0.3px',
        padding: `${theme.spacing(1.875, 3)}`,
        backgroundColor: '#FFC20E',

        '@media (min-width:400px)': {
          fontSize: '12px',
        },
        '@media (min-width:1024px)': {
          fontSize: '12px',
        },
        '@media (min-width:1200px)': {
          fontSize: '12px',
        },
        '@media (min-width:1400px)': {
          fontSize: '16px',
        },
        ':hover': {
          textDecoration: 'none',
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
          backgroundColor: '#FFC20E',
          color: '#454F5B',
        },
      },
      contained: {
        boxShadow: theme.shadows[3],
        padding: `${theme.spacing(1.875, 5.5)}`,
        '&.Mui-disabled': {
          color: theme.palette.text.secondary,
          backgroundColor: '#EBE9F1',
        },
      },
      outlined: {
        padding: `${theme.spacing(1.625, 5.25)}`,
      },
      sizeSmall: {
        padding: `${theme.spacing(1, 2.25)}`,
        '&.MuiButton-contained': {
          padding: `${theme.spacing(1, 3.5)}`,
        },
        '&.MuiButton-outlined': {
          padding: `${theme.spacing(0.75, 3.25)}`,
        },
      },
      sizeLarge: {
        padding: `${theme.spacing(2.125, 5.5)}`,
        '&.MuiButton-contained': {
          padding: `${theme.spacing(2.125, 6.5)}`,
        },
        '&.MuiButton-outlined': {
          padding: `${theme.spacing(1.875, 6.25)}`,
        },
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
  },
});

export default Button;
