import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const DataGridStyled = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    border: 'none',
    color: '#908BA5',
    fontWeight: 600,
    fontSize: theme.spacing(4),
    '.MuiDataGrid-withBorder': {
      borderRight: 'none',
    },
    '.MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
    '.MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
    },
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-columnHeaderTitle': {
    fontSize: theme.spacing(4),
    fontWeight: 700,
    letterSpacing: theme.spacing(0.0325),
    color: theme.palette.text.secondary,
  },
  '& .MuiTablePagination-root': {
    '& .MuiToolbar-root': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-root': {
      marginRight: theme.spacing(6.5),
    },
    '& .MuiSelect-select': {
      padding: theme.spacing(0, 6, 0, 0),
    },
    '& .MuiButtonBase-root': {
      padding: 0,
      '&.Mui-disabled': {
        color: theme.palette.text.secondary,
      },
    },
    '& .MuiTablePagination-selectLabel': {
      margin: 0,
      lineHeight: theme.spacing(5),
      color: `${theme.palette.text.primary} !important`,
    },
    '& .MuiTablePagination-displayedRows': {
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));
