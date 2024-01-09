import { PATH } from '@/constants';
import { NavLink } from '@/layouts/types';
import { IconButton, styled } from '@mui/material';
import Menu from 'mdi-material-ui/Menu';
import { useState } from 'react';
import FormSearchComponent from './components/FormSearch';

const NavStyled = styled('nav')(({ theme }) => ({
  height: theme.spacing(16),
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  position: 'fixed',
  zIndex: '10',
}));

const MenuStyled = styled('ul')(({ theme }) => ({
  float: 'right',
  marginRight: theme.spacing(5),
  '@media (max-width: 858px)': {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    background: '#2c3e50',
    top: theme.spacing(16),
    left: '-100%',
    textAlign: 'center',
    transition: 'all .5s',
  },
}));

const MenuItemStyled = styled('li')(({ theme }) => ({
  display: 'inline-block',
  lineHeight: theme.spacing(16),
  margin: `0 ${theme.spacing(2.25)}`,
  '@media (max-width:952px)': {
    fontSize: '16px',
    paddingLeft: theme.spacing(12.5),
  },
  '@media (max-width: 858px)': {
    display: 'block',
  },
}));

const LogoStyled = styled('label')(({ theme }) => ({
  color: theme.palette.background.paper,
  fontSize: '35px',
  lineHeight: theme.spacing(16),
  padding: `0 ${theme.spacing(25)}`,
  '@media (max-width:952px)': {
    fontSize: '30px',
    paddingLeft: theme.spacing(12.5),
  },
}));

const ButtonStyled = styled('label')(({ theme }) => ({
  fontSize: '30px',
  color: theme.palette.background.paper,
  float: 'right',
  lineHeight: theme.spacing(16),
  marginRight: theme.spacing(8),
}));

const NextLinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.background.paper,
  fontSize: '17px',
  borderRadius: theme.spacing(1),
  padding: `${theme.spacing(1.75)} ${theme.spacing(2.5)}`,
  textTransform: 'uppercase',
  ':hover': {
    backgroundColor: theme.palette.info.light,
    transition: '.5s',
  },
  '&.active': {
    backgroundColor: theme.palette.info.light,
    transition: '.5s',
  },

  '@media (max-width: 858px)': {
    padding: `${theme.spacing(1.75)} ${theme.spacing(30)}`,
    ':hover': {
      backgroundColor: 'none',
      color: '#2c3e50',
    },
    '&.active': {
      backgroundColor: 'none',
      color: '#2c3e50',
    },
  },
}));

const ACTIVE_LINK = 'active';
const FLOAT_LEFT_ZERO = '0';
const FLOAT_LEFT_100 = '100%';
const LOGO_TEXT = 'NFT';
const DEFAULT_ACTIVE = 0;
const MenuAppBarComponent = ({
  navigation,
  hidden,
}: {
  navigation: NavLink[];
  hidden: boolean;
}) => {
  // ** Hook
  const [openMenu, setOpenMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(DEFAULT_ACTIVE);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleChangePage = (index?: number) => {
    setActiveMenu(index ?? DEFAULT_ACTIVE);
  };

  return (
    <NavStyled>
      {hidden && (
        <ButtonStyled>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <Menu />
          </IconButton>
        </ButtonStyled>
      )}
      <LogoStyled>{LOGO_TEXT}</LogoStyled>

      <MenuStyled
        sx={{
          '@media (max-width: 858px)': {
            left: openMenu ? FLOAT_LEFT_ZERO : `-${FLOAT_LEFT_100}`,
          },
        }}
      >
        {navigation?.map((item: NavLink, index) => {
          return (
            <MenuItemStyled
              key={item?.title}
              onClick={() => handleChangePage(index)}
            >
              <NextLinkStyled
                className={index === activeMenu ? ACTIVE_LINK : ''}
                href={item?.path ?? PATH.HOME}
              >
                {item?.title}
              </NextLinkStyled>
            </MenuItemStyled>
          );
        })}
      </MenuStyled>
      <FormSearchComponent />
    </NavStyled>
  );
};

export default MenuAppBarComponent;
