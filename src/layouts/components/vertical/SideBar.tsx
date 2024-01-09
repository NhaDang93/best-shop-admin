import CloseIcon from '@mui/icons-material/Close';
import { IconButton, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SideBarWrapper = styled('div')({
  height: '100%',
  width: '300px',
  backgroundColor: 'white',
  transition: 'all 1s ease-in-out 0s',
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
  '@media (min-width:200px)': {
    width: '60%',
    position: 'absolute',
    zIndex: 20,
  },
  '@media (min-width:400px)': {
    width: '60%',
    position: 'absolute',
    zIndex: 20,
  },
  '@media (min-width:1024px)': {
    width: '60%',
    position: 'absolute',
    zIndex: 20,
  },
  '@media (min-width:1200px)': {
    width: '300px',
  },
  '@media (min-width:1400px)': {
    width: '300px',
  },
  '&.open': {
    left: '0px',
    display: 'block',
    zIndex: 999,
  },
  '&.close': {
    left: '-100%',
  },
});

const LogoDetailsStyled = styled('div')({
  display: 'flex',
  height: '60px',
  width: '100%',
  fontSize: '22px',
  color: '#666666',
  alignItems: 'center',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontWeight: 700,
  backgroundColor: 'while',
  '@media (min-width:400px)': {
    fontSize: '16px',
    height: '40px',
  },
  '@media (min-width:1024px)': {
    fontSize: '18px',
    height: '50px',
  },
  '@media (min-width:1200px)': {
    fontSize: '20px',
    height: '60px',
  },
  '@media (min-width:1400px)': {
    fontSize: '22px',
    height: '60px',
  },
});

const NavLinkStyled = styled('ul')({
  height: '100vh',
  paddingTop: '40px',
  paddingInlineStart: '0',
});

const NavLinkItemStyled = styled('li')({
  listStyle: 'none',
  position: 'relative',
  transition: 'all 0.5s easy',
  margin: '8px',

  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  '&.active': {
    backgroundColor: '#FFC20E',
    color: 'white',
    span: {
      color: 'white',
    },
  },
  ':hover': {
    backgroundColor: '#FFC20E',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
    a: {
      color: 'white',
      span: {
        color: 'white',
      },
    },
  },

  a: {
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontWeight: 700,
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '24px',
    ':hover': {
      color: 'white',
    },
  },
});

const LinkNameStyled = styled('span')({
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'Be VietNam Pro, sans-serif',
  color: '#666666',
  ':hover': {
    color: 'white',
  },
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  '@media (min-width:1024px)': {
    fontSize: '16px',
  },
  '@media (min-width:1200px)': {
    fontSize: '16px',
  },
  '@media (min-width:1400px)': {
    fontSize: '18px',
  },
});

const HeaderLeftLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '16px',
  zIndex: '10',
  backgroundColor: 'white',
  padding: '16px',
}));

const SideBarComponent = (props: any) => {
  const { logout, setIsShowSideBar, isShowSideBar } = props;
  const { t } = useTranslation();

  const route = useRouter();

  const [activeKey, setActiveKey] = useState('Dashboard');

  const routes = [
    { key: 'Dashboard', name: 'Dashboard', path: '/dashboard' },
    { key: 'HouseFee', name: t('house_fee'), path: '/house-fee' },
    { key: 'SalesMoney', name: t('sales_money'), path: '/sales-money' },
    { key: 'Import money', name: t('import_money'), path: '/import-money' },
    {
      key: 'Spending money',
      name: t('spending_money'),
      path: '/spending-money',
    },
    { key: 'Exchange cash', name: t('exchange_cash'), path: '/exchange-cash' },
    { key: 'House Money', name: t('house_money'), path: '/house-money' },
  ];

  const handleChangePage = (key: string) => {
    const routeProcess = routes.find((x) => x?.key === key);
    if (routeProcess) {
      setActiveKey(routeProcess.key);
      route.push(routeProcess?.path);
    }
  };

  useEffect(() => {
    const routeFind = routes.find((x) => {
      return x?.path.includes(route?.asPath);
    });
    if (routeFind) {
      setActiveKey(routeFind.key);
    }
  }, []);

  const handleCloseMenu = () => {
    setIsShowSideBar?.(false);
  };

  return (
    <SideBarWrapper
      sx={{
        position: 'absolute',
      }}
      className={isShowSideBar ? 'open' : 'close'}
    >
      <LogoDetailsStyled>
        <HeaderLeftLayout>
          <IconButton onClick={handleCloseMenu}>
            <CloseIcon
              fontSize="medium"
              sx={{
                fontSize: '32px',
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.5,
                },
              }}
            />
          </IconButton>
        </HeaderLeftLayout>
      </LogoDetailsStyled>
      <NavLinkStyled>
        {routes.map((item) => {
          return (
            <NavLinkItemStyled
              key={item?.key}
              className={activeKey === item?.key ? 'active' : ''}
              onClick={() => handleChangePage(item?.key)}
            >
              <a>
                <LinkNameStyled>{item?.name}</LinkNameStyled>
              </a>
            </NavLinkItemStyled>
          );
        })}
      </NavLinkStyled>
    </SideBarWrapper>
  );
};

export default SideBarComponent;
