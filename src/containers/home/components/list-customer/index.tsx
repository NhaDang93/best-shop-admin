import { Stack, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGetListCustomerMutation } from '../../../../apis';
import { FORMAT_YYYY_MM_DD_HH_MM_SS } from '../../../../constants';

import Loading from '../../../../components/shared-components/loading';
import { IFilterCustomerParams } from '../../../../types';
import CustomerTable from '../tables/Customer';

const ListCustomerWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  display: 'flex',
  padding: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  paddingBottom: '100px',
  alignSelf: 'stretch',
  color: 'rgb(97, 97, 97)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '16px',
  overflow: 'hidden',
  border: 'none rgba(144, 202, 249, 0.46)',
  boxShadow: 'inherit',
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '133.4%',
}));

const ListCustomer = ({
  customerFilter,
}: {
  customerFilter: IFilterCustomerParams;
}) => {
  const [getListCustomer, getListCustomerRes] = useGetListCustomerMutation();

  useEffect(() => {
    const handleFetchDataCustomer = async () => {
      if (customerFilter?.userMisEmployee) {
        await getListCustomer({
          requestId: uuidv4() as string,
          partnerId: 'SALE_PORTAL',
          channelId: 'PORTAL',
          requestTime:
            dayjs(new Date()).format(FORMAT_YYYY_MM_DD_HH_MM_SS) ?? '',
          data: customerFilter,
        });
      }
    };
    handleFetchDataCustomer();
  }, [customerFilter]);

  const renderCustomerTable = useMemo(() => {
    return (
      <CustomerTable
        customers={getListCustomerRes?.data?.listCustomerDataList ?? []}
      />
    );
  }, [getListCustomerRes?.data]);

  return (
    <ListCustomerWrapper>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ width: '100%' }}
      >
        <TitleStyled>Danh sách khách hàng</TitleStyled>
      </Stack>
      <Stack style={{ width: '100%' }}>{renderCustomerTable}</Stack>
      {getListCustomerRes?.isLoading && <Loading />}
    </ListCustomerWrapper>
  );
};

export default ListCustomer;
