import { LoginForm } from '@/containers/auth/login/components/LoginForm';
import { dispatch } from '@/store/app-dispatch';
import Menu from '@mui/icons-material/Menu';
import { IconButton, Stack, Typography, styled } from '@mui/material';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Marquee from 'react-fast-marquee';
import { Image } from '../components/shared-components/Image';
import Loading from '../components/shared-components/loading';
import Error1 from '../containers/error';
import { useAuth } from '../hooks/useAuth';
import { setLoadingApp } from '../store/slices/app';
import HeaderRight from './components/HeaderRight';
import SideBarComponent from './components/vertical/SideBar';

interface Props {
  children: ReactNode;
}
const PortSaleLayoutWrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
});
const LayoutContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  maxWidth: '100%',
}));

const HeaderLayout = styled('div')(({ theme }) => ({
  height: '60px',
  backgroundColor: theme.palette.background.paper,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '24px',
  position: 'sticky',
  top: 0,
  zIndex: 9,
  '@media (max-width:1024px)': {
    width: '100%',
  },
  '@media (max-width:768px)': {
    width: '100%',
  },
}));

const BodyLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
}));

const BodyContainerStyled = styled('div')(({ theme }) => ({
  marginTop: '40px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'calc(90% + 16px)',
  '@media (max-width:1024px)': {
    width: '100%',
  },
}));

const HeaderCenterLayout = styled('div')(({ theme }) => ({
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (max-width:1200px)': {
    width: '40%',
  },
  '@media (max-width:1024px)': {
    display: 'none',
  },
}));

/* eslint-disable */
// @ts-nocheck
const MarqueeStyled = styled(Marquee)(({ theme }) => ({
  borderRadius: '4px',
  backgroundColor: '#FFC20E',
  paddingLeft: '16px',
  paddingBottom: '4px',
  paddingTop: '4px',
  '@media (max-width:1024px)': {
    display: 'none',
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: '#454F5B',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
}));

const OverlayStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '0',
  right: '0',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.4s ease 0s',
  '&.open': {
    display: 'block',
    backgroundColor: 'rgba(17, 17, 17, 0.36)',
    zIndex: '998',
  },
  '&.close': {
    display: 'none',
  },
}));

export interface LayoutContext {
  login?: (body?: LoginForm) => Promise<void>;
}

export const LayoutContext = createContext<LayoutContext>({});

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(
      'useCustomerDetailContext must be used within a CustomerListContext.Provider'
    );
  }
  return context;
};

const PortSaleLayout = ({ children }: Props) => {
  const {
    loading,
    authSelector,
    statusCode,
    isValid,
    message,
    logout,
    login,
    onUserInfoRes,
  } = useAuth();
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  useEffect(() => {
    dispatch(setLoadingApp(false));
  }, []);

  const values = useMemo(
    () => ({ login, loading }),
    // eslint-disable-next-line no-restricted-globals
    [login, loading]
  );
  const handleOpenMenu = () => {
    setIsShowSideBar(true);
  };

  const handleCloseMenu = () => {
    setIsShowSideBar(false);
  };

  if (loading === undefined || loading === null) {
    return (
      <PortSaleLayoutWrapper className="layout-wrapper">
        <LayoutContainer>
          <BodyLayout>
            <BodyContainerStyled>
              <Loading />
            </BodyContainerStyled>
          </BodyLayout>
        </LayoutContainer>
      </PortSaleLayoutWrapper>
    );
  } else {
    if (!isValid && isValid !== null && loading === false) {
      return <Error1 message={message ?? ''} statusCode={statusCode ?? ''} />;
    }
    return (
      <LayoutContext.Provider value={values}>
        {loading && <Loading />}
        <OverlayStyled
          onClick={handleCloseMenu}
          className={isShowSideBar ? 'open' : 'close'}
        />
        <PortSaleLayoutWrapper className="layout-wrapper">
          <SideBarComponent
            isShowSideBar={isShowSideBar}
            logout={logout}
            setIsShowSideBar={setIsShowSideBar}
          />
          <LayoutContainer>
            <HeaderLayout>
              <IconButton onClick={handleOpenMenu}>
                <Menu
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
              <HeaderCenterLayout>
                <MarqueeStyled>
                  <Stack flexDirection={'row'} gap={'12px'}>
                    <Stack flexDirection={'row'} gap={'8px'}>
                      <Image src={'/images/Meteor.png'} />
                      <TypographyStyled>Lorm islum sit amen</TypographyStyled>
                    </Stack>
                  </Stack>
                </MarqueeStyled>
              </HeaderCenterLayout>
              <HeaderRight
                key={'menu-header-2'}
                logout={logout}
                fullName={authSelector?.email ?? ''}
              />
            </HeaderLayout>
            <BodyLayout>
              <BodyContainerStyled>{children}</BodyContainerStyled>
            </BodyLayout>
          </LayoutContainer>
        </PortSaleLayoutWrapper>
        {onUserInfoRes?.isLoading && <Loading />}
      </LayoutContext.Provider>
    );
  }
};

export default PortSaleLayout;
