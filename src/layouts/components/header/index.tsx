import Language from '@/components/shared-components/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, BoxProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeaderUser from './header-user';
import SearchInput from './input-search';

const HeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  backgroundColor: '#f46a6a',
  boxShadow: '0 4px 20px rgba(0,0,0,.08)',
  gap: '0.5rem',
  position: 'sticky',
  zIndex: '20',
  top: '0',
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

const IconHomeStyled = styled(MenuIcon)(({ theme }) => ({
  color: '#fff',
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

const HeaderImage = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  img: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
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

interface IHeaderLayout {
  isMobile: boolean;
  toggleMenu: boolean;
  handleToggleMenu: () => void;
}

const HeaderLayout = ({
  isMobile,
  toggleMenu,
  handleToggleMenu,
}: IHeaderLayout) => {
  if (!isMobile) {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderImage>
            {/* <Image src="/images/logo_odalink_white.svg" /> */}
          </HeaderImage>
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
                <HeaderUser />
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
  }
  return (
    <HeaderWrapper>
      <div
        className={`overlay ${toggleMenu ? 'open' : ''}`}
        onClick={handleToggleMenu}
      />
      <HeaderContainer>
        <HeaderImage onClick={handleToggleMenu}>
          <IconHomeStyled />
        </HeaderImage>
        <SearchInput />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderLayout;
