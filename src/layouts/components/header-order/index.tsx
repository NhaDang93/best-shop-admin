import Language from '@/components/shared-components/Language';
import { HomeOutlined } from '@mui/icons-material';
import { Box, BoxProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const HeaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  backgroundColor: '#f46a6a',
  boxShadow: '0 4px 20px rgba(0,0,0,.08)',

  '.overlay': {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 998,
    display: 'none',
    width: '100%',
    height: '100%',
    backgroundColor: '#1111115c',
    transition: 'all 0.4s ease',

    '&.open': {
      display: 'block',
    },
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '60px',
  padding: 0,

  '@media (max-width: 1024px)': {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 70px',
  },
  '@media (max-width: 768px)': {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
  },
}));

const HeaderRightContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  display: 'none',
}));

const LanguageStyled = styled(Box)<BoxProps>(({ theme }) => ({
  '& .MuiFormLabel-root': {
    display: 'none',
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    maxHeight: theme.spacing(9),
    top: 0,
    color: 'white',

    legend: {
      display: 'none',
    },
  },
  '& .MuiInputBase-root': {
    maxHeight: theme.spacing(9),
  },
  '& .MuiAutocomplete-input': {
    padding: '0 !important',
    height: 'auto',
    fontSize: theme.spacing(3.5),
    lineHeight: 1,
  },
}));

const IconHomeStyled = styled(HomeOutlined)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  fontSize: '32px',
  color: theme.palette.background.paper,
  cursor: 'pointer',
}));

const OrderHeaderLayout = () => {
  const router = useRouter();

  const handleGotoPage = () => {
    router.push('/');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <IconHomeStyled onClick={handleGotoPage} />

        <HeaderRightContent>
          <Box
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px',
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              spacing={4}
              justifyContent="center"
            >
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  color: 'white',
                }}
                style={{
                  marginTop: 0,
                }}
              >
                <LanguageStyled>
                  <Language />
                </LanguageStyled>
              </Box>
            </Stack>
          </Box>
        </HeaderRightContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default OrderHeaderLayout;
