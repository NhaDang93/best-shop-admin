import { Box, styled } from '@mui/material';
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

import { formatNumber } from '@/utils';
import { useTranslation } from 'react-i18next';
import { DataGridStyled } from '../../../../components/common/DataGrid.styled';
import { IReport } from '../../../../types';

export const ExchangeCashListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 7px 29px 0px rgb(0 0 0 / 12%)',
  padding: '16px',
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

const ReportTable = ({ reports }: { reports: IReport[] }) => {
  const { t } = useTranslation();

  const baseColumnOptions = {
    sortable: false,
    hideable: true,
  };

  const ExchangeCashsProcess = useMemo(() => {
    return (
      reports?.map((_ExchangeCash: IReport, index) => {
        return {
          ..._ExchangeCash,
          id: index + 1,
        };
      }) || []
    );
  }, [reports]);

  const ExchangeCashsColumn: (Omit<GridColDef, 'sortComparator'> & {
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
      flex: 1,
      minWidth: 200,
      field: 'priceCash',
      headerName: 'Cash',
      headerAlign: 'center',
      renderCell: ({ row }: GridRenderCellParams<IReport, IReport>) => {
        return (
          <p
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {formatNumber(row?.priceCash)}
          </p>
        );
      },
    },
    {
      ...baseColumnOptions,
      flex: 1,
      minWidth: 200,
      field: 'atm',
      headerName: 'ATM',
      headerAlign: 'center',
      renderCell: ({ row }: GridRenderCellParams<IReport, IReport>) => {
        return (
          <p
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {formatNumber(row?.priceATM)}
          </p>
        );
      },
    },
    {
      ...baseColumnOptions,
      flex: 1,
      minWidth: 200,
      field: 'sell_online',
      headerName: 'Sell online',
      headerAlign: 'center',
      renderCell: ({ row }: GridRenderCellParams<IReport, IReport>) => {
        return (
          <p
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {formatNumber(row?.priceSellOnline)}
          </p>
        );
      },
    },
  ];

  return (
    <ExchangeCashListWrapper>
      <DataGridStyled
        rows={ExchangeCashsProcess || []}
        showColumnVerticalBorder
        showCellVerticalBorder
        autoHeight
        rowHeight={80}
        //   onRowClick={onRowClick as any}
        columns={ExchangeCashsColumn}
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
    </ExchangeCashListWrapper>
  );
};

export default ReportTable;
