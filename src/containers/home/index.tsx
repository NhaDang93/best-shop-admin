import { styled } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FORMAT_DD_MM_YYYY_V2 } from '../../constants';
import { auth } from '../../store/slices/app';
import { IFilterCustomerParams } from '../../types';
import FilterHome from './components/filter-home';
import ListCustomer from './components/list-customer';

const HomeContainerWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const HomeContainer = () => {
  const authSelector = useSelector(auth);
  const [customerFilter, setCustomerFilter] = useState<IFilterCustomerParams>({
    cif: '',
    statusContact: '',
    fromDate:
      dayjs(new Date()).format(FORMAT_DD_MM_YYYY_V2)?.replace(/\s/g, '') ?? '',
    toDate:
      dayjs(new Date()).format(FORMAT_DD_MM_YYYY_V2)?.replace(/\s/g, '') ?? '',
    userMisEmployee: '',
  });

  const renderFilter = useMemo(() => {
    return (
      <FilterHome
        customerFilter={customerFilter}
        setCustomerFilter={setCustomerFilter}
      />
    );
  }, [customerFilter]);

  const renderListCustomer = useMemo(() => {
    return <ListCustomer customerFilter={customerFilter} />;
  }, [customerFilter]);

  return (
    <HomeContainerWrapper>
      {renderFilter}
      {renderListCustomer}
    </HomeContainerWrapper>
  );
};

export const Home = HomeContainer;
