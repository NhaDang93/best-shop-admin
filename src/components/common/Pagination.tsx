import { TablePagination } from '@mui/material';
import { useCallback } from 'react';

interface IPagination {
  rowsPerPageOptions: number[] | undefined;
  page: number;
  setRowsPerPage: (
    value:
      | ((prevState: number | undefined) => number | undefined)
      | number
      | undefined
  ) => void;
  params: any;
  count: any;
  rowsPerPage: number | undefined;
  setPage: (value: ((prevState: number) => number) | number) => void;
  setParams: (value: any) => void;
}

const Pagination = ({
  rowsPerPageOptions,
  page,
  setPage,
  count,
  ...rest
}: IPagination) => {
  const onPageChange = useCallback(
    (event: MouseEvent, _page: number) => setPage(_page + 1),
    []
  );

  const onRowsPerPageChange = useCallback((event: any) => {
    setPage(1);
    rest?.setRowsPerPage(event?.target?.value);
  }, []);

  if (!count) {
    return null;
  }
  return (
    <TablePagination
      {...(rest as any)}
      component="div"
      page={page - 1}
      count={count || 0}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage="Item page"
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
};

export default Pagination;
