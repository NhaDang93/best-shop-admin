// ** MUI Imports
import { Theme } from '@mui/material/styles';

const input = (theme: Theme) => ({
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: theme.spacing(3.5),
        transform: `translate(14px, -12px) scale(0.875)`,
        '& .MuiInputLabel-asterisk': {
          color: theme.palette.error.main,
        },
        asterisk: {
          color: theme.palette.error.main,
          '&$error': {
            color: theme.palette.error.main,
          },
        },
        '&.Mui-focused': {
          color: theme.palette.text.primary,
        },
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        fontSize: theme.spacing(3.5),
        '&:before': {
          borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`,
        },
        '&.Mui-disabled:before': {
          borderBottom: `1px solid ${theme.palette.text.disabled}`,
        },
        '& .MuiInputLabel-asterisk': {
          color: theme.palette.error.main,
        },
      },
      '& .MuiInputLabel-asterisk': {
        color: theme.palette.error.main,
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        fontSize: theme.spacing(3.5),
        backgroundColor: `rgba(${theme.palette.customColors.main}, 0.04)`,
        '&:hover:not(.Mui-disabled)': {
          backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`,
        },
        '&:before': {
          borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`,
        },
        '& .MuiInputLabel-asterisk': {
          color: theme.palette.error.main,
        },
      },
      '& .MuiInputLabel-asterisk': {
        color: theme.palette.error.main,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        fontSize: theme.spacing(4),
        '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
          borderColor: `rgba(${theme.palette.customColors.main}, 0.32)`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: `1px`,
          borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`,
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.text.disabled,
        },
        '&.MuiInputLabel-asterisk': {
          color: theme.palette.error.main,
        },
      },
    },
    '& .MuiInputLabel-asterisk': {
      color: theme.palette.error.main,
    },
  },
});

export default input;
