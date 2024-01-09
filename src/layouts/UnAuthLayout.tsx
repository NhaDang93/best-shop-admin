import Loading from '@/components/shared-components/loading';
import { LoginForm } from '@/containers/auth/login/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { dispatch } from '@/store/app-dispatch';
import { loadingApp, setLoadingApp } from '@/store/slices/app';
import { styled } from '@mui/material';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

export default interface Props {
  children: ReactNode;
}
const UnAuthLayoutWrapper = styled('div')({
  height: '100vh',
});
const LayoutContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  maxWidth: '100%',
}));

const BodyLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const BodyContainerStyled = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'calc(100%)',

  height: 'calc(100vh - 80px - 24px - 40px)',
  '@media (max-width:1024px)': {
    width: '100%',
  },
}));

const FooterContainerStyled = styled('div')(({ theme }) => ({
  height: '80px',
}));

export interface UnLayoutContext {
  login?: (body?: LoginForm) => Promise<void>;
}

export const UnLayoutContext = createContext<UnLayoutContext>({});

export const useUnLayoutContext = () => {
  const context = useContext(UnLayoutContext);
  if (context === undefined) {
    throw new Error(
      'useCustomerDetailContext must be used within a CustomerListContext.Provider'
    );
  }
  return context;
};

export const UnAuthLayout = ({ children }: Props) => {
  const { login } = useAuth();
  const loading = useSelector(loadingApp);
  const values = useMemo(
    () => ({ login }),
    // eslint-disable-next-line no-restricted-globals
    [login]
  );
  useEffect(() => {
    dispatch(setLoadingApp(false));
  }, []);

  return (
    <UnLayoutContext.Provider value={values}>
      <UnAuthLayoutWrapper className="layout-wrapper">
        <LayoutContainer>
          <BodyLayout>
            <BodyContainerStyled>
              {loading && <Loading />}
              {children}
            </BodyContainerStyled>
            <FooterContainerStyled />
          </BodyLayout>
        </LayoutContainer>
      </UnAuthLayoutWrapper>
    </UnLayoutContext.Provider>
  );
};
