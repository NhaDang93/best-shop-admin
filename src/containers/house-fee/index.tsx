import { useGetMoneyRecordBoardMutation } from '@/apis';
import { useGetListMonthMutation, useGetListYearMutation } from '@/apis/common';
import { IMonthItem, IYearItem, PriceTypeEnum } from '@/types';
import { responseParams } from '@/utils';
import { styled } from '@mui/material';
import getYear from 'date-fns/getYear';

import Loading from '@/components/shared-components/loading';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FilterHouseFee, { FilterForm } from './components/filter';
import HouseFeeTable from './components/tables/HouseFee';

const HouseFeeWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '50px',
}));

export interface HouseFeeContext {
  convertListYear?: { label: string; id: string; name: string }[] | null;
  convertListMonth?: { label: string; id: string; name: string }[] | null;
  moneyRecordBoardRes?: any;
  handleFetchApi?: () => void;
}

export const HouseFeeContext = createContext<HouseFeeContext>({});

export const useHouseFeeContext = () => {
  const context = useContext(HouseFeeContext);
  if (context === undefined) {
    throw new Error(
      'useCustomerDetailContext must be used within a CustomerListContext.Provider'
    );
  }
  return context;
};

function HouseFeeContainer() {
  const [getMoneyRecordBoardMutation, getMoneyRecordBoardMutationRes] =
    useGetMoneyRecordBoardMutation();
  const [getListYear, getListYearRes] = useGetListYearMutation();
  const [getListMonth, getListMonthRes] = useGetListMonthMutation();
  const [houseFeeFilter, setHouseFeeFilter] = useState<FilterForm>({
    Year: getYear(new Date()),
  });

  const convertListMonth = useMemo(() => {
    const data = getListMonthRes?.data as IMonthItem[];

    return (
      data?.map((_data) => {
        return {
          label: _data?.yearName,
          id: _data?.id,
          name: _data?.yearName,
        };
      }) || null
    );
  }, [getListMonthRes?.data]);

  const handleFetchApi = async () => {
    await getMoneyRecordBoardMutation?.(
      responseParams({
        date: houseFeeFilter?.Year,
        priceType: PriceTypeEnum.House_Fee,
        isGet: true,
      })
    )?.unwrap();
  };
  useEffect(() => {
    handleFetchApi();
  }, [houseFeeFilter]);

  useEffect(() => {
    const handleFetchCommonData = async () => {
      await getListYear({
        requestId: uuidv4() as string,
        partnerId: 'Admin',
        channelId: 'Manager',
        requestTime: '2023-08-03 11:27:02',
      }).unwrap();
      await getListMonth({
        requestId: uuidv4() as string,
        partnerId: 'Admin',
        channelId: 'Manager',
        requestTime: '2023-08-03 11:27:02',
      }).unwrap();
    };
    handleFetchCommonData();
  }, []);

  const convertListYear = useMemo(() => {
    const data = getListYearRes?.data as IYearItem[];

    return (
      data?.map((_data) => {
        return {
          label: _data?.yearName,
          id: _data?.id,
          name: _data?.yearName,
        };
      }) || null
    );
  }, [getListYearRes?.data]);

  const values = useMemo(
    () => ({
      convertListYear,
      convertListMonth,
      handleFetchApi,
    }),
    // eslint-disable-next-line no-restricted-globals
    [convertListYear, convertListMonth, handleFetchApi]
  );
  return (
    <HouseFeeContext.Provider value={values}>
      <HouseFeeWrapper>
        <FilterHouseFee setHouseFeeFilter={setHouseFeeFilter} />
        <HouseFeeTable
          houseFees={getMoneyRecordBoardMutationRes?.data?.data ?? []}
        />
      </HouseFeeWrapper>
      {getMoneyRecordBoardMutationRes.isLoading && <Loading />}
    </HouseFeeContext.Provider>
  );
}

export const HouseFee = HouseFeeContainer;
