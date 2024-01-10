import { Box, styled } from '@mui/material';
import background from '../../../../public/images/background_default_admin.png';
import LoginComponent from './components/LoginForm';

const LoginWrapper = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const BackgroundRandomStyled = styled(Box)(() => ({
  display: 'block',
  height: '100%',
  overflow: 'hidden',
  position: 'fixed',
  width: '100%',
  zIndex: -1,
  '& img': {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  },
}));

const LoginContainerStyled = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
}));

const ImageWrapper = styled('div')(() => ({
  width: '40%',
  '@media (min-width:200px)': {
    display: 'none',
  },
  '@media (min-width:400px)': {
    display: 'none',
  },
  '@media (min-width:1024px)': {
    display: 'none',
  },
  '@media (min-width:1200px)': {
    display: 'block',
  },
  '@media (min-width:1400px)': {
    display: 'block',
  },
}));

const LoginContainer = () => {
  return (
    <LoginWrapper>
      <BackgroundRandomStyled>
        <img src={`${background.src}`} alt="" />
      </BackgroundRandomStyled>
      <LoginContainerStyled>
        <ImageWrapper />
        <LoginComponent />
      </LoginContainerStyled>
    </LoginWrapper>
  );
};

export const Login = LoginContainer;
