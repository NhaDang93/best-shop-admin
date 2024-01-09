import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const DataGridStyled = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    border: 'none',
    color: '#212B36',
    fontWeight: 600,
    fontSize: theme.spacing(4),
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
    '.Mui-checked': {
      color: '#FFC20E',
    },
    '.MuiDataGrid-withBorder': {
      borderRight: 'none',
    },
    '.MuiDataGrid-cellContent': {
      fontSize: theme.spacing(4),
      '@media (min-width:200px)': {
        fontSize: '10px',
      },
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
    },

    '.MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
    '.MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
    },
    '.MuiDataGrid-columnHeader': {
      padding: '16px',
    },
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-columnHeaders': {
    backgroundColor: '#EAEEF2',
  },
  '.MuiDataGrid-cell--withRightBorder': {
    borderColor: '#D3D8DE',
  },
  '.MuiDataGrid-columnHeaderDraggableContainer': {
    height: '56px',
    '@media (min-width:200px)': {
      fontSize: '30px',
    },
    '@media (min-width:400px)': {
      fontSize: '56px',
    },
    '@media (min-width:1024px)': {
      fontSize: '56px',
    },
    '@media (min-width:1200px)': {
      fontSize: '56px',
    },
    '@media (min-width:1400px)': {
      fontSize: '100px',
    },
  },
  '.MuiDataGrid-columnHeaderTitle': {
    fontSize: theme.spacing(4),
    fontWeight: 700,
    letterSpacing: theme.spacing(0.0325),
    color: '#212B36',
    fontFamily: 'Be VietNam Pro, sans-serif',
    lineHeight: '20px',
    whiteSpace: 'normal',
    textAlign: 'center',
    '@media (min-width:200px)': {
      fontSize: '10px',
    },
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
