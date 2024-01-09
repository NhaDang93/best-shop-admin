import { Box, Button, Chip, Typography, styled, useTheme } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  GridColDef,
  GridPagination,
  GridRenderCellParams,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { useMemo } from 'react';

import { useRouter } from 'next/router';
import { DataGridStyled } from '../../../../components/common/DataGrid.styled';
import { Image } from '../../../../components/shared-components/Image';
import { PATH, STATUS_CIF } from '../../../../constants';
import { ICustomer } from '../../../../types';
import { backgroundStatusContract } from '../../../../utils';

export const CustomerListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 7px 29px 0px rgb(0 0 0 / 12%)',
}));

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount as any}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return (
    <GridPagination
      labelRowsPerPage="Tổng số trên 1 trang"
      ActionsComponent={Pagination}
      {...props}
    />
  );
}

const CustomerTable = ({ customers }: { customers: ICustomer[] }) => {
  const theme = useTheme();
  // const router = useRouter();

  const router = useRouter();

  const baseColumnOptions = {
    sortable: false,
    hideable: true,
  };

  const customersProcess = useMemo(() => {
    return customers.map((_customer: ICustomer, index) => {
      return {
        ..._customer,
        id: index + 1,
      };
    });
  }, [customers]);

  const customersColumn: (Omit<GridColDef, 'sortComparator'> & {
    field: keyof any | string;
    sortComparator?: () => any;
  })[] = [
    {
      field: 'id',
      headerName: 'STT',
      maxWidth: 70,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      ...baseColumnOptions,
      width: 100,
      field: 'cif',
      headerName: 'Mã KH',
      headerAlign: 'center',
      renderCell: ({ row }: GridRenderCellParams<ICustomer, ICustomer>) => {
        return (
          <p
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="text"
              onClick={() =>
                handleGotoPage(row?.cif ?? '', row?.idHis?.toString() ?? '')
              }
              style={{
                textDecoration: 'underline',
                color: '#1890FF' ? '#1890FF' : '#D3D8DE',
              }}
              sx={{
                ':hover': {
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              }}
            >
              {row?.cif}
            </Button>
          </p>
        );
      },
    },
    {
      ...baseColumnOptions,
      field: 'fullName',
      headerName: 'Họ tên',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      ...baseColumnOptions,
      field: 'Active',
      headerName: 'Active',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams<ICustomer, ICustomer>) => {
        return row?.statusCif === STATUS_CIF.Active ? (
          <Image
            src="/images/icon/success.png"
            style={{ height: '24px', width: '24px' }}
          />
        ) : (
          <Image
            src="/images/icon/cancel.png"
            style={{ height: '48px', width: '48px' }}
          />
        );
      },
    },
    {
      ...baseColumnOptions,
      field: 'birthDay',
      headerName: 'Ngày sinh',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<any, any>) => {
        return <Typography>{row?.birthDate ?? '-'}</Typography>;
      },
    },
    {
      ...baseColumnOptions,
      field: 'statusContact',
      headerName: 'Trạng thái phân công',
      headerAlign: 'center',
      width: 200,
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams<ICustomer, ICustomer>) => {
        const backgroundColorStatus = backgroundStatusContract(
          row?.statusContact ?? ''
        );
        return (
          <Chip
            sx={{
              minWidth: '128px',
              display: 'flex',
              fontFamily: 'Be VietNam Pro, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: '0.16px',
              height: '24px',
              cursor: 'pointer',
              backgroundColor: backgroundColorStatus,
            }}
            key={`${row?.statusContact}`}
            label={`${row?.statusContact}`}
          />
        );
      },
    },
    {
      ...baseColumnOptions,
      field: 'assignmentDate',
      headerName: 'Ngày được phân công',
      headerAlign: 'center',
      width: 150,
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams<ICustomer, ICustomer>) => {
        return <Typography>{row?.assignmentDate ?? '-'}</Typography>;
      },
    },
    {
      ...baseColumnOptions,
      field: 'note',
      headerName: 'Ghi chú',
      headerAlign: 'center',
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams<any, any>) => {
        return (
          <Box
            sx={{
              maxHeight: '70px',
              overflowY: 'auto',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {row?.note ?? ''}
            </Typography>
          </Box>
        );
      },
    },
  ];

  function handleGotoPage(cif: string, idHis: string) {
    router.push(`${PATH.CUSTOMER}?cif=${cif}&idHis=${idHis}`);
  }

  return (
    <CustomerListWrapper>
      <DataGridStyled
        rows={customersProcess || []}
        showColumnVerticalBorder
        showCellVerticalBorder
        autoHeight
        rowHeight={80}
        //   onRowClick={onRowClick as any}
        columns={customersColumn}
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnSelector
        sx={{
          '&.MuiDataGrid-root': {
            height: '100%',
            cursor: 'pointer',
          },
          '.MuiDataGrid-withBorderColor': {
            borderColor: '#D3D8DE',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        slots={{
          pagination: CustomPagination,
        }}
      />
    </CustomerListWrapper>
  );
};

export default CustomerTable;
