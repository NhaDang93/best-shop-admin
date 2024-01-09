import { Box, styled, useTheme } from '@mui/material';
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
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

import ActionExchangeCash from '@/containers/exchange-cash/components/tables/ActionExchangeCash';
import { formatNumber } from '@/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { DataGridStyled } from '../../../../components/common/DataGrid.styled';
import { IImportMoney } from '../../../../types';

export const ImportMoneyListWrapper = styled(Box)(({ theme }) => ({
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

const ImportMoneyTable = ({
  importMoneys,
}: {
  importMoneys: IImportMoney[];
}) => {
  const theme = useTheme();
  // const router = useRouter();
  const { t } = useTranslation();

  const router = useRouter();

  const baseColumnOptions = {
    sortable: false,
    hideable: true,
  };

  const ImportMoneysProcess = useMemo(() => {
    return (
      importMoneys?.map((_ImportMoney: IImportMoney, index) => {
        return {
          ..._ImportMoney,
          id: index + 1,
        };
      }) || []
    );
  }, [importMoneys]);

  const ImportMoneysColumn: (Omit<GridColDef, 'sortComparator'> & {
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
      field: 'date',
      headerName: t('date'),
      headerAlign: 'center',
      renderCell: ({
        row,
      }: GridRenderCellParams<IImportMoney, IImportMoney>) => {
        if (row?.price?.date) {
          const parsedTime = parseISO(row?.price?.date);
          const formattedTime = format(parsedTime, 'yyyy-MM-dd ');

          return (
            <p
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {formattedTime}
            </p>
          );
        }
        return (
          <p
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {}
          </p>
        );
      },
    },
    {
      ...baseColumnOptions,
      flex: 1,
      minWidth: 200,
      field: 'priceCash',
      headerName: 'Cash',
      headerAlign: 'center',
      renderCell: ({
        row,
      }: GridRenderCellParams<IImportMoney, IImportMoney>) => {
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
      renderCell: ({
        row,
      }: GridRenderCellParams<IImportMoney, IImportMoney>) => {
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
      field: 'note',
      headerName: t('note'),
      headerAlign: 'center',
      renderCell: ({
        row,
      }: GridRenderCellParams<IImportMoney, IImportMoney>) => {
        return (
          <p
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {row?.note}
          </p>
        );
      },
    },
    {
      ...baseColumnOptions,
      flex: 1,
      minWidth: 200,
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({
        row,
      }: GridRenderCellParams<IImportMoney, IImportMoney>) => {
        return <ActionExchangeCash row={row} />;
      },
    },
  ];

  return (
    <ImportMoneyListWrapper>
      <DataGridStyled
        rows={ImportMoneysProcess || []}
        showColumnVerticalBorder
        showCellVerticalBorder
        autoHeight
        rowHeight={80}
        //   onRowClick={onRowClick as any}
        columns={ImportMoneysColumn}
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
    </ImportMoneyListWrapper>
  );
};

export default ImportMoneyTable;
