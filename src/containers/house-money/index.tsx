import { useGetMoneyRecordBoardMutation } from '@/apis';
import { useGetListMonthMutation, useGetListYearMutation } from '@/apis/common';
import { IMonthItem, IYearItem, PriceTypeEnum } from '@/types';
import { responseParams } from '@/utils';
import { styled } from '@mui/material';
import getYear from 'date-fns/getYear';

import Loading from '@/components/shared-components/loading';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FilterHouseMoney, { FilterForm } from './components/filter';
import HouseMoneyTable from './components/tables/HouseMoney';

const HouseMoneyWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '50px',
}));

export interface HouseMoneyContext {
  convertListYear?: { label: string; id: string; name: string }[] | null;
  convertListMonth?: { label: string; id: string; name: string }[] | null;
  moneyRecordBoardRes?: any;
  handleFetchApi?: () => void;
}

export const HouseMoneyContext = createContext<HouseMoneyContext>({});

export const useHouseMoneyContext = () => {
  const context = useContext(HouseMoneyContext);
  if (context === undefined) {
    throw new Error(
      'useCustomerDetailContext must be used within a CustomerListContext.Provider'
    );
  }
  return context;
};

const getMonth = (month: string) => {
  let result = '';
  if (month === 'Thg 12') {
    result = '12';
  }
  if (month === 'Thg 11') {
    result = '11';
  }
  if (month === 'Thg 10') {
    result = '10';
  }
  if (month === 'Thg 9') {
    result = '9';
  }
  if (month === 'Thg 12') {
    result = '8';
  }
  if (month === 'Thg 7') {
    result = '7';
  }
  if (month === 'Thg 6') {
    result = '6';
  }
  if (month === 'Thg 5') {
    result = '5';
  }
  if (month === 'Thg 4') {
    result = '4';
  }
  if (month === 'Thg 3') {
    result = '3';
  }
  if (month === 'Thg 2') {
    result = '2';
  }
  if (month === 'Thg 1') {
    result = '1';
  } else {
    result = '1';
  }

  return result;
};

function HouseMoneyContainer() {
  const [getMoneyRecordBoardMutation, getMoneyRecordBoardMutationRes] =
    useGetMoneyRecordBoardMutation();
  const [getListYear, getListYearRes] = useGetListYearMutation();
  const [getListMonth, getListMonthRes] = useGetListMonthMutation();
  const [HouseMoneyFilter, setHouseMoneyFilter] = useState<FilterForm>({
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
        date: HouseMoneyFilter?.Year,
        priceType: PriceTypeEnum.House_Money,
        isGet: true,
      })
    )?.unwrap();
  };
  useEffect(() => {
    handleFetchApi();
  }, [HouseMoneyFilter]);

  useEffect(() => {
    const handleFetchCommonData = async () => {
      await getListYear({
        requestId: uuidv4() as string,
        partnerId: 'SALE_PORTAL',
        channelId: 'PORTAL',
        requestTime: '2023-08-03 11:27:02',
      }).unwrap();
      await getListMonth({
        requestId: uuidv4() as string,
        partnerId: 'SALE_PORTAL',
        channelId: 'PORTAL',
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
    <HouseMoneyContext.Provider value={values}>
      <HouseMoneyWrapper>
        <FilterHouseMoney setHouseMoneyFilter={setHouseMoneyFilter} />
        <HouseMoneyTable
          HouseMoneys={getMoneyRecordBoardMutationRes?.data?.data ?? []}
        />
      </HouseMoneyWrapper>
      {getMoneyRecordBoardMutationRes.isLoading && <Loading />}
    </HouseMoneyContext.Provider>
  );
}

export const HouseMoney = HouseMoneyContainer;
