// ** React Imports

// ** MUI Components
import Backdrop from '@mui/material/Backdrop';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Image } from '../Image';

interface ILoading {
  label?: string;
  backdropColor?: string;
}

const WrapperLoading = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  paddingLeft: theme.spacing(3.75),
  paddingRight: theme.spacing(3.75),
  borderRadius: theme.spacing(2),
}));

const LabelLoading = styled(Box)<BoxProps>(({ theme }) => ({
  color: '#bb2126',
  lineHeight: theme.spacing(6),
  fontSize: '24px',
  fontWeight: 700,
}));
const Loading = (props: ILoading) => {
  const { label = 'Loading', backdropColor = 'rgba(235, 233, 241, 0.5)' } =
    props;

  return (
    <div>
      <Backdrop
        sx={{
          background: backdropColor,
          zIndex: (theme) => theme.zIndex.drawer + 1300,
        }}
        open
      >
        <WrapperLoading>
          <Image src="/images/icon/loader.gif" />
          <LabelLoading
            sx={{
              '::after': {
                content: `"${label}"`,
                animationName: 'loading-text',
                animationDuration: '3s',
                animationIterationCount: 'infinite',
              },
              '@keyframes loading-text': {
                '0%': {
                  content: `"${label}"`,
                },
                '25%': {
                  content: `"${label}."`,
                },
                '50%': {
                  content: `"${label}.."`,
                },
                '75%': {
                  content: `"${label}..."`,
                },
              },
            }}
          />
        </WrapperLoading>
      </Backdrop>
    </div>
  );
};

export default Loading;
