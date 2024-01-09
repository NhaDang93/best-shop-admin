import { useGetMoneyRecordBoardMutation } from '@/apis';
import { useGetListMonthMutation, useGetListYearMutation } from '@/apis/common';
import { IMonthItem, IYearItem, PriceTypeEnum } from '@/types';
import { responseParams } from '@/utils';
import { styled } from '@mui/material';
import { format } from 'date-fns';
import getYear from 'date-fns/getYear';
import { vi } from 'date-fns/locale';

import Loading from '@/components/shared-components/loading';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FilterImportMoney, { FilterForm } from './components/filter';
import ImportMoneyTable from './components/tables/ImportMoney';

const ImportMoneyWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '50px',
}));

export interface ImportMoneyContext {
  convertListYear?: { label: string; id: string; name: string }[] | null;
  convertListMonth?: { label: string; id: string; name: string }[] | null;
  moneyRecordBoardRes?: any;
  handleFetchApi?: () => void;
}

export const ImportMoneyContext = createContext<ImportMoneyContext>({});

export const useImportMoneyContext = () => {
  const context = useContext(ImportMoneyContext);
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
    result = '09';
  }
  if (month === 'Thg 12') {
    result = '08';
  }
  if (month === 'Thg 7') {
    result = '07';
  }
  if (month === 'Thg 6') {
    result = '06';
  }
  if (month === 'Thg 5') {
    result = '05';
  }
  if (month === 'Thg 4') {
    result = '04';
  }
  if (month === 'Thg 3') {
    result = '03';
  }
  if (month === 'Thg 2') {
    result = '02';
  }
  if (month === 'Thg 1') {
    result = '01';
  }

  return result;
};

function ImportMoneyContainer() {
  const [getMoneyRecordBoardMutation, getMoneyRecordBoardMutationRes] =
    useGetMoneyRecordBoardMutation();
  const [getListYear, getListYearRes] = useGetListYearMutation();
  const [getListMonth, getListMonthRes] = useGetListMonthMutation();
  const [ImportMoneyFilter, setImportMoneyFilter] = useState<FilterForm>({
    Year: getYear(new Date()),
    Month: format(new Date(), 'LLL', { locale: vi }),
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
        date: ImportMoneyFilter?.Year,
        dateMonth: getMonth(ImportMoneyFilter?.Month),
        priceType: PriceTypeEnum.Import_Money,
        isGet: true,
      })
    )?.unwrap();
  };
  useEffect(() => {
    handleFetchApi();
  }, [ImportMoneyFilter]);

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
    <ImportMoneyContext.Provider value={values}>
      <ImportMoneyWrapper>
        <FilterImportMoney setImportMoneyFilter={setImportMoneyFilter} />
        <ImportMoneyTable
          importMoneys={getMoneyRecordBoardMutationRes?.data?.data ?? []}
        />
      </ImportMoneyWrapper>
      {getMoneyRecordBoardMutationRes.isLoading && <Loading />}
    </ImportMoneyContext.Provider>
  );
}

export const ImportMoney = ImportMoneyContainer;
