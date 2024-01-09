import { DataGridStyled } from '@/components/common/DataGrid.styled';
import QuantityCart from '@/components/shared-components/QuantityCart';
import { useLayoutContext } from '@/layouts/UnAuthLayout';
import { Chip, useTheme } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { ICategory, IProduct } from '../..';
import { ProductCell } from './ProductCell';

interface ICategoryProps {
  category: ICategory[];
  index: number;
}

type CategoriesRow = {
  id: number;
  supplierName: string;
  isCategoriesRow: boolean;
  count_products: number;
};

type CategoriesRows = CategoriesRow | IProduct;

export const CategoryTable = ({ category, index }: ICategoryProps) => {
  const theme = useTheme();

  const { findProductYourCart } = useLayoutContext();

  const rowItems = category.reduce<CategoriesRows[]>((acc, s) => {
    acc.push({
      id: s?.category_id ?? 0,
      supplierName: s?.category_name ?? '',
      isCategoriesRow: true,
      count_products: s?.count_products ?? 0,
    });
    if (s?.products !== undefined && s?.products?.length > 0) {
      s?.products.forEach((product) => {
        acc.push(product);
      });
    }
    return acc;
  }, []);

  const rowItemsProcessed = useMemo(() => {
    return rowItems?.map((_rowItems: CategoriesRows, inx: number) => ({
      ..._rowItems,
    }));
  }, [rowItems]);

  const baseColumnOptions = {
    sortable: false,
    pinnable: false,
    hideable: false,
  };

  const categoriesColumn: (Omit<GridColDef, 'sortComparator'> & {
    field: keyof any | string;
    sortComparator?: () => any;
  })[] = [
    {
      ...baseColumnOptions,
      field: 'title',
      headerName: 'Title',
      flex: 2,

      colSpan: ({ row }) => {
        return 'isCategoriesRow' in row ? 2 : undefined;
      },
      renderCell: ({
        row,
      }: GridRenderCellParams<CategoriesRows, CategoriesRows>) => {
        if ('isCategoriesRow' in row) {
          return `${row?.supplierName}(${row?.count_products})`;
        }
        return (
          <ProductCell
            productPrice={row?.unit_price ?? 0}
            productUnit={row?.unit ?? ''}
            picture={row?.image?.[0]?.url}
            productName={row?.name}
            id={row?.id}
          />
        );
      },
    },
    {
      ...baseColumnOptions,
      field: 'unit',
      headerName: 'Unit',
      hideable: true,
      width: 120,
      renderCell: ({
        row,
      }: GridRenderCellParams<CategoriesRows, CategoriesRows>) => {
        if ('isCategoriesRow' in row) {
          return ``;
        }
        if (row.stock === 0) {
          return <Chip label="Out Stock" />;
        }

        return (
          <QuantityCart
            product={{
              key: row?.id,
              id: row?.id,
              name: row?.name ?? '',
              origin: row?.origin,
              description: row?.origin ?? '',
              unit: row?.unit ?? '',
              unit_price: row?.unit_price ?? 0,
              stock: row?.unit_price ?? 0,
              brand: row?.brand ?? '',
              stock_alert: row?.stock_alert ?? 0,
              cart: {
                qty: 0,
              },
              image: row?.image as any,
            }}
            key={`divQty${row?.name}`}
          />
        );
      },
    },
  ];

  return (
    <DataGridStyled
      rows={rowItemsProcessed}
      rowHeight={120}
      columns={categoriesColumn}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      hideFooterPagination
      getRowClassName={(record) => {
        if ('isCategoriesRow' in record.row) {
          return 'supplier-row';
        }
        return '';
      }}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          display: 'none',
        },
        '.supplier-row': {
          minHeight: '50px !important',
          maxHeight: '50px !important',
          color: '#5e5873',
          fontSize: '1.05rem',
          fontFamily: 'Noto Sans Bold',
          fontStyle: 'normal',
          lineHeight: 1.5,
          letterSpacing: '1px',
          textTransform: 'capitalize',
          background: '#f4f4f4',
          '.MuiDataGrid-cell--withRenderer': {
            minHeight: '50px !important',
            maxHeight: '50px !important',
          },
        },
        '&.MuiDataGrid-root': {
          height: '100%',
          cursor: 'pointer',
          borderRadius: 0,
          border: `${theme.spacing(0.25)} solid rgba(0, 0, 0, 0.12)`,
        },

        '& .MuiDataGrid-cell--withRenderer': {
          paddingLeft: '8px',
          paddingRight: '8px',
          paddingTop: '16px',
          paddingBottom: '16px',
        },
        '& .MuiDataGrid-footerContainer': {
          display: 'none',
        },
        minHeight: theme.spacing(68),
      }}
    />
  );
};
