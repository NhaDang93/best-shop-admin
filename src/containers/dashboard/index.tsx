import { useGetMoneyRecordBoardReportByMonthMutation } from '@/apis';
import Loading from '@/components/shared-components/loading';
import { IBoardReportByMonthYear } from '@/types';
import { responseParams } from '@/utils';
import { Stack, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import getYear from 'date-fns/getYear';
import { vi } from 'date-fns/locale';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PieChartReport from './components/charts/Pie';
import DetailDashboard from './components/detail';
import FilterDashboard, { FilterForm } from './components/filter';
import ReportTable from './components/tables/Report';

const CustomerDetailWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '50px',
  width: '100%',
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '133.4%',
}));

export interface DashboardContext {}

export const DashboardContext = createContext<DashboardContext>({});
const getMonth = (month: string) => {
  let result = '1';
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
  if (month === 'Thg 8') {
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
  }

  return parseFloat(result);
};
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error(
      'useCustomerDetailContext must be used within a CustomerListContext.Provider'
    );
  }
  return context;
};

const DashboardContainer = () => {
  const { t } = useTranslation();

  const [reportByMonth, ReportByMonthRes] =
    useGetMoneyRecordBoardReportByMonthMutation();

  const [dashboardFilter, setDashboardFilter] = useState<FilterForm>({
    Year: getYear(new Date()),
    Month: getMonth(format(new Date(), 'LLL', { locale: vi })),
  });
  const totalHouseMoney = useMemo(() => {
    const dataReport = ReportByMonthRes.data?.data as IBoardReportByMonthYear;
    const total =
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceSellOnline ?? 0);

    return total;
  }, [ReportByMonthRes]);

  const totalRevenueAndExpenditure = useMemo(() => {
    const dataReport = ReportByMonthRes.data?.data as IBoardReportByMonthYear;
    const totalSalesMoney =
      (dataReport?.moneyRecordBoardMonthSalesMoney?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthSalesMoney?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthSalesMoney?.priceSellOnline ?? 0);

    const totalImportMoney =
      (dataReport?.moneyRecordBoardMonthImportMoney?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthImportMoney?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthImportMoney?.priceSellOnline ?? 0);

    const totalExchangeCash =
      (dataReport?.moneyRecordBoardMonthExchangeCash?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthExchangeCash?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthExchangeCash?.priceSellOnline ?? 0);

    const totalSpendingMoney =
      (dataReport?.moneyRecordBoardMonthSpendingMoney?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthSpendingMoney?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthSpendingMoney?.priceSellOnline ?? 0);

    const totalHouseFee =
      (dataReport?.moneyRecordBoardMonthHouseFee?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseFee?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseFee?.priceSellOnline ?? 0);
    const totalHouseMoneyByMonth =
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceATM ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceCash ?? 0) +
      (dataReport?.moneyRecordBoardMonthHouseMoney?.priceSellOnline ?? 0);

    return (
      totalSalesMoney +
      totalExchangeCash +
      totalHouseFee -
      totalImportMoney -
      totalSpendingMoney -
      totalHouseMoneyByMonth
    );
  }, [ReportByMonthRes]);

  const totalCash = useMemo(() => {
    const dataReport = ReportByMonthRes.data?.data as IBoardReportByMonthYear;
    const totalSalesMoney =
      dataReport?.moneyRecordBoardMonthSalesMoney?.priceCash ?? 0;

    const totalImportMoney =
      dataReport?.moneyRecordBoardMonthImportMoney?.priceCash ?? 0;

    const totalExchangeCash =
      dataReport?.moneyRecordBoardMonthExchangeCash?.priceCash ?? 0;
    const totalSpendingMoney =
      dataReport?.moneyRecordBoardMonthSpendingMoney?.priceCash ?? 0;
    const totalHouseFee =
      dataReport?.moneyRecordBoardMonthHouseFee?.priceCash ?? 0;

    return (
      totalSalesMoney +
      totalExchangeCash +
      totalHouseFee -
      totalImportMoney -
      totalSpendingMoney
    );
  }, [ReportByMonthRes]);

  const totalATM = useMemo(() => {
    const dataReport = ReportByMonthRes.data?.data as IBoardReportByMonthYear;
    const totalSalesMoney =
      dataReport?.moneyRecordBoardMonthSalesMoney?.priceATM ?? 0;

    const totalImportMoney =
      dataReport?.moneyRecordBoardMonthImportMoney?.priceATM ?? 0;

    const totalExchangeCash =
      dataReport?.moneyRecordBoardMonthExchangeCash?.priceATM ?? 0;
    const totalSpendingMoney =
      dataReport?.moneyRecordBoardMonthSpendingMoney?.priceATM ?? 0;
    const totalHouseFee =
      dataReport?.moneyRecordBoardMonthHouseFee?.priceATM ?? 0;
    return (
      totalSalesMoney +
      totalExchangeCash +
      totalHouseFee -
      totalImportMoney -
      totalSpendingMoney
    );
  }, [ReportByMonthRes]);

  const totalSellOnline = useMemo(() => {
    const dataReport = ReportByMonthRes.data?.data as IBoardReportByMonthYear;
    const totalSalesMoney =
      dataReport?.moneyRecordBoardMonthSalesMoney?.priceSellOnline ?? 0;

    const totalImportMoney =
      dataReport?.moneyRecordBoardMonthImportMoney?.priceSellOnline ?? 0;

    const totalExchangeCash =
      dataReport?.moneyRecordBoardMonthExchangeCash?.priceSellOnline ?? 0;
    const totalSpendingMoney =
      dataReport?.moneyRecordBoardMonthSpendingMoney?.priceSellOnline ?? 0;
    const totalHouseFee =
      dataReport?.moneyRecordBoardMonthHouseFee?.priceSellOnline ?? 0;
    return (
      totalSalesMoney +
      totalExchangeCash +
      totalHouseFee -
      totalImportMoney -
      totalSpendingMoney
    );
  }, [ReportByMonthRes]);

  useEffect(() => {
    const handleFetchDashboardData = async () => {
      await reportByMonth?.(
        responseParams({
          year: dashboardFilter.Year,
          month: dashboardFilter.Month,
          isReportByMonth: true,
        })
      )?.unwrap();
    };
    handleFetchDashboardData();
  }, [dashboardFilter]);
  const values = useMemo(
    () => ({}),
    // eslint-disable-next-line no-restricted-globals
    []
  );

  return (
    <DashboardContext.Provider value={values}>
      <CustomerDetailWrapper>
        <FilterDashboard setDashboardFilter={setDashboardFilter} />
        <DetailDashboard
          totalATM={totalATM}
          totalRevenueAndExpenditure={totalRevenueAndExpenditure}
          totalCash={totalCash}
          totalSellOnline={totalSellOnline}
          totalHouseMoney={totalHouseMoney}
        />

        <Stack
          gap="16px"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          {ReportByMonthRes.data?.data?.moneyRecordBoardMonthHouseFee && (
            <Stack flexDirection="row" flexWrap="wrap" gap="16px">
              <Stack
                sx={{
                  flex: '1',
                  maxWidth: '100%',
                  overflow: 'scroll',

                  '@media (min-width:200px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:400px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                }}
              >
                <TitleStyled>{t('house_fee')}</TitleStyled>

                <PieChartReport
                  report={
                    ReportByMonthRes.data?.data
                      ?.moneyRecordBoardMonthHouseFee ?? {}
                  }
                  title={t('house_fee')}
                />
              </Stack>

              <Stack
                flexDirection="column"
                gap="24px"
                sx={{
                  width: '100%',
                  flex: '1',
                  '@media (min-width:200px)': {
                    display: 'none',
                  },
                  '@media (min-width:400px)': {
                    display: 'none',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                  },
                }}
              >
                <ReportTable
                  reports={
                    [
                      ReportByMonthRes.data?.data
                        ?.moneyRecordBoardMonthHouseFee,
                    ] ?? []
                  }
                />
              </Stack>
            </Stack>
          )}

          {ReportByMonthRes.data?.data?.moneyRecordBoardMonthSpendingMoney && (
            <Stack
              flexWrap="wrap"
              gap="24px"
              sx={{
                width: '100%',
                '@media (min-width:400px)': {
                  flexDirection: 'row',
                },
                '@media (min-width:1024px)': {
                  flexDirection: 'row',
                },
                '@media (min-width:1200px)': {
                  flexDirection: 'row-reverse',
                },
                '@media (min-width:1400px)': {
                  flexDirection: 'row-reverse',
                },
              }}
            >
              <Stack
                sx={{
                  flex: '1',
                  maxWidth: '100%',
                  overflow: 'scroll',

                  '@media (min-width:200px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:400px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                }}
              >
                <TitleStyled>{t('spending_money')}</TitleStyled>

                <PieChartReport
                  report={
                    ReportByMonthRes.data?.data
                      ?.moneyRecordBoardMonthSpendingMoney ?? {}
                  }
                  title={t('spending_money')}
                />
              </Stack>

              <Stack
                gap="16px"
                sx={{
                  width: '100%',
                  flex: '1',
                  '@media (min-width:200px)': {
                    display: 'none',
                  },
                  '@media (min-width:400px)': {
                    display: 'none',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                  },
                }}
              >
                <ReportTable
                  reports={
                    [
                      ReportByMonthRes.data?.data
                        ?.moneyRecordBoardMonthSpendingMoney,
                    ] ?? []
                  }
                />
              </Stack>
            </Stack>
          )}

          {ReportByMonthRes.data?.data?.moneyRecordBoardMonthImportMoney && (
            <Stack flexWrap="wrap" gap="16px" flexDirection="row">
              <Stack
                sx={{
                  flex: '1',
                  maxWidth: '100%',
                  overflow: 'scroll',

                  '@media (min-width:200px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:400px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                }}
              >
                <TitleStyled>{t('import_money')}</TitleStyled>

                <PieChartReport
                  report={
                    ReportByMonthRes.data?.data
                      ?.moneyRecordBoardMonthImportMoney ?? {}
                  }
                  title={t('import_money')}
                />
              </Stack>

              <Stack
                flexDirection="column"
                gap="16px"
                sx={{
                  width: '100%',
                  flex: '1',
                  '@media (min-width:200px)': {
                    display: 'none',
                  },
                  '@media (min-width:400px)': {
                    display: 'none',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                  },
                }}
              >
                <ReportTable
                  reports={
                    [
                      ReportByMonthRes.data?.data
                        ?.moneyRecordBoardMonthImportMoney,
                    ] ?? []
                  }
                />
              </Stack>
            </Stack>
          )}
          {ReportByMonthRes.data?.data?.moneyRecordBoardMonthExchangeCash && (
            <Stack
              flexDirection="row"
              gap="16px"
              flexWrap="wrap"
              sx={{
                width: '100%',
                '@media (min-width:400px)': {
                  flexDirection: 'row',
                },
                '@media (min-width:1024px)': {
                  flexDirection: 'row',
                },
                '@media (min-width:1200px)': {
                  flexDirection: 'row-reverse',
                },
                '@media (min-width:1400px)': {
                  flexDirection: 'row-reverse',
                },
              }}
            >
              <Stack
                sx={{
                  flex: '1',
                  maxWidth: '100%',
                  overflow: 'scroll',

                  '@media (min-width:200px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:400px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                }}
              >
                <TitleStyled>{t('exchange_cash')}</TitleStyled>

                <PieChartReport
                  report={
                    ReportByMonthRes.data?.data
                      ?.moneyRecordBoardMonthExchangeCash ?? {}
                  }
                  title={t('exchange_cash')}
                />
              </Stack>
              <Stack
                gap="16px"
                sx={{
                  width: '100%',
                  flex: '1',
                  '@media (min-width:200px)': {
                    display: 'none',
                  },
                  '@media (min-width:400px)': {
                    display: 'none',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                  },
                }}
              >
                <ReportTable
                  reports={
                    [
                      ReportByMonthRes.data?.data
                        ?.moneyRecordBoardMonthExchangeCash,
                    ] ?? []
                  }
                />
              </Stack>
            </Stack>
          )}

          {ReportByMonthRes.data?.data?.moneyRecordBoardMonthSalesMoney && (
            <Stack flexDirection="row" flexWrap="wrap" gap="16px">
              <Stack
                sx={{
                  flex: '1',
                  maxWidth: '100%',
                  overflow: 'scroll',

                  '@media (min-width:200px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:400px)': {
                    maxWidth: '100%',
                    overflow: 'scroll',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                    overflow: 'visible',
                  },
                }}
              >
                <TitleStyled>{t('sales_money')}</TitleStyled>

                <PieChartReport
                  report={
                    ReportByMonthRes.data?.data
                      ?.moneyRecordBoardMonthSalesMoney ?? {}
                  }
                  title={t('sales_money')}
                />
              </Stack>

              <Stack
                flexDirection="column"
                gap="16px"
                sx={{
                  width: '100%',
                  flex: '1',
                  '@media (min-width:200px)': {
                    display: 'none',
                  },
                  '@media (min-width:400px)': {
                    display: 'none',
                  },
                  '@media (min-width:768px)': {
                    display: 'block',
                  },
                  '@media (min-width:800px)': {
                    display: 'block',
                  },
                  '@media (min-width:1200px)': {
                    display: 'block',
                  },
                  '@media (min-width:1400px)': {
                    display: 'block',
                  },
                }}
              >
                <ReportTable
                  reports={
                    [
                      ReportByMonthRes.data?.data
                        ?.moneyRecordBoardMonthSalesMoney,
                    ] ?? []
                  }
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      </CustomerDetailWrapper>

      {ReportByMonthRes?.isLoading && <Loading />}
    </DashboardContext.Provider>
  );
};

export const Dashboard = DashboardContainer;
