// ** MUI Imports
import { Theme } from '@mui/material/styles';

const Table = (theme: Theme) => ({
  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: theme.shadows[0],
        borderTopColor: theme.palette.divider,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-head': {
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: theme.spacing(0.0325),
          color: theme.palette.text.secondary,
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-body': {
          letterSpacing: theme.spacing(0.0625),
          color: theme.palette.text.secondary,
          '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)':
            {
              paddingTop: theme.spacing(3.5),
              paddingBottom: theme.spacing(3.5),
            },
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-head:first-of-type, & .MuiTableCell-root:first-of-type': {
          paddingLeft: theme.spacing(5),
        },
        '& .MuiTableCell-head:last-of-type, & .MuiTableCell-root:last-of-type': {
          paddingRight: theme.spacing(5),
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '& .MuiButton-root': {
          color: theme.palette.text.secondary,
        },
      },
      stickyHeader: {
        backgroundColor: theme.palette.customColors.tableHeaderBg,
      },
    },
  },
});

export default Table;
