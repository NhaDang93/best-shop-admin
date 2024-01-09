// ** React Imports

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw',
  },
}));

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
}));

const ButtonBackStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: '6px 16px',
  backgroundColor: '#FFC20E',
  color: '#454F5B',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#FFC20E',
    color: '#454F5B',
  },
}));

const BASE_URL = process.env.NEXT_PUBLIC_HDBANK ?? '';

export default function Custom404({
  message = 'Page Not Found',
  statusCode = '404',
}: {
  message?: string;
  statusCode?: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Box className="content-center">
        <Box
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <BoxWrapper>
            <Typography variant="h1" sx={{ mb: 2.5 }}>
              {statusCode}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 2.5,
                letterSpacing: '0.18px',
                fontSize: '1.5rem !important',
              }}
            >
              {message}
            </Typography>
            <Typography variant="body2">
              We couldn&prime;t find the page you are looking for.
            </Typography>
          </BoxWrapper>
          <Img
            width="100px"
            height="200px"
            alt="error-illustration"
            src="/images/pages/404.png"
          />
          <Link
            passHref
            href={BASE_URL}
            style={{
              textDecoration: 'none',
            }}
          >
            <ButtonBackStyled sx={{ px: 5.5 }}>Back to Home</ButtonBackStyled>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
