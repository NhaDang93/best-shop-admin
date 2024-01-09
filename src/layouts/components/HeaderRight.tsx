import Language from '@/components/shared-components/Language';
import { Typography, styled } from '@mui/material';
import { Image } from '../../components/shared-components/Image';

const HeaderRightLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

const SearchIcon = styled(Image)(({ theme }) => ({
  width: '28px',
  height: '28px',
  cursor: 'pointer',
}));

const LogoutIcon = styled(Image)(({ theme }) => ({
  width: '24px',
  height: '24px',
  cursor: 'pointer',
}));

const UserNameStyled = styled(Typography)(({ theme }) => ({
  color: '#454F5B',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '24px',
  '@media (min-width:200px)': {
    display: 'none',
  },
  '@media (min-width:400px)': {
    display: 'none',
  },
  '@media (min-width:768px)': {
    display: 'block',
  },
  '@media (min-width:800px)': {
    display: 'block',
  },
  '@media (min-width:1024px)': {
    display: 'block',
  },
  '@media (min-width:1400px)': {
    display: 'block',
  },
}));

const HeaderRight = ({
  logout,
  fullName = '-',
}: {
  logout: () => void;
  fullName: string;
}) => {
  return (
    <HeaderRightLayout>
      <Language />
      <SearchIcon src="/images/search.png" />
      <UserNameStyled>{fullName}</UserNameStyled>
      <LogoutIcon onClick={logout} src="/images/Logout.png" />
    </HeaderRightLayout>
  );
};

export default HeaderRight;
