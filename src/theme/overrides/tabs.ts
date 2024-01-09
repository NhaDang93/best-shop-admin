// ** MUI Imports
import { Theme } from '@mui/material/styles';

const Tabs = (theme: Theme) => ({
  MuiTabs: {
    styleOverrides: {
      vertical: {
        minWidth: 130,
        marginRight: theme.spacing(4),
        borderRight: `1px solid ${theme.palette.divider}`,
        '& .MuiTab-root': {
          minWidth: 130,
          marginRight: theme.spacing(4),
          borderRight: `1px solid ${theme.palette.divider}`,
          '& .MuiTab-root': {
            minWidth: 130,
          },
        },
      },
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        color: theme.palette.text.primary,
        fontSize: theme.spacing(4),
        fontWeight: 500,
        '&.Mui-selected': {
          color: theme.palette.primary,
        },
      },
    },
  },
});

export default Tabs;
