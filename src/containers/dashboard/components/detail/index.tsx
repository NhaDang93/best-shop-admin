import { formatNumber } from '@/utils';
import { Stack, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DetailDashboardWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '50px',
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '133.4%',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  '@media (min-width:1024px)': {
    fontSize: '16px',
  },
  '@media (min-width:1200px)': {
    fontSize: '20px',
  },
  '@media (min-width:1400px)': {
    fontSize: '24px',
  },
}));

const TextStyled = styled(Typography)(({ theme }) => ({
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '133.4%',
  '@media (min-width:400px)': {
    fontSize: '8px',
  },
  '@media (min-width:1024px)': {
    fontSize: '12px',
  },
  '@media (min-width:1200px)': {
    fontSize: '16px',
  },
  '@media (min-width:1400px)': {
    fontSize: '20px',
  },
}));

const DetailDashboard = ({
  totalATM,
  totalCash,
  totalRevenueAndExpenditure,
  totalSellOnline,
  totalHouseMoney,
}: {
  totalATM: number;
  totalCash: number;
  totalRevenueAndExpenditure: number;
  totalSellOnline: number;
  totalHouseMoney: number;
}) => {
  const { t } = useTranslation();

  const renderTotalExpenditure = () => {
    return (
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        gap="24px"
        sx={{
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '16px',
          alignItems: 'start',
        }}
      >
        <Stack
          gap="12px"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <TitleStyled>{t('total')}</TitleStyled>
          <TextStyled>
            {formatNumber(totalRevenueAndExpenditure)} vnđ
          </TextStyled>
        </Stack>
        <Stack
          gap="12px"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <TitleStyled>{t('total_atm')}</TitleStyled>
          <TextStyled>{formatNumber(totalATM)} vnđ</TextStyled>
        </Stack>
        <Stack
          gap="12px"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <TitleStyled>{t('total_cash')}</TitleStyled>
          <TextStyled>{formatNumber(totalCash)} vnđ</TextStyled>
        </Stack>
        <Stack
          gap="12px"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <TitleStyled>{t('total_sell_online')}</TitleStyled>
          <TextStyled>{formatNumber(totalSellOnline)} vnđ</TextStyled>
        </Stack>
        <Stack
          gap="12px"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <TitleStyled>{t('total_house_money')}</TitleStyled>
          <TextStyled>{formatNumber(totalHouseMoney)} vnđ</TextStyled>
        </Stack>
      </Stack>
    );
  };

  return (
    <DetailDashboardWrapper>{renderTotalExpenditure()}</DetailDashboardWrapper>
  );
};

export default DetailDashboard;
