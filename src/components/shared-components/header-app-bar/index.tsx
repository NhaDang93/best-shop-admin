import { homeData } from '@/containers/home/mockData';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { IInformationHeader } from '../header-information';

const HeaderImageStyled = styled(Box)(({ theme }) => ({
  height: '406px',
  width: '100%',
  '@media (max-width: 1200px)': {
    height: '280px',
  },
  '@media (max-width: 576px)': {
    height: '180px',
    position: 'relative',
  },
}));

const HeaderAppBarComponent = () => {
  const [informationHeader, setInformationHeader] =
    useState<IInformationHeader>();

  useEffect(() => {
    setInformationHeader(homeData.data.supplier as any);
  }, [homeData]);
  return (
    <HeaderImageStyled
      style={{
        backgroundImage: `url(${
          informationHeader?.logo?.url ??
          'https://firebasestorage.googleapis.com/v0/b/petpet-ba45b.appspot.com/o/banner_1.png?alt=media&token=b1c04c91-5828-4b26-b1e0-75ef85403422'
        })`,
        backgroundSize: 'cover',
      }}
    />
  );
};

export default HeaderAppBarComponent;
