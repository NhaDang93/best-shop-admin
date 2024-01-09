import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';

const HeaderUserWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'flex-end',
  padding: '0 10px',
  color: '#fff',
  fontSize: '16px',
  fontFamily: 'Noto Sans',
  textAlign: 'center',
  '.icon-user': {
    fontSize: '16px',
    background: 'transparent',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    lineHeight: '40px',
  },
}));

const HeaderUser = () => {
  return (
    <HeaderUserWrapper>
      <PersonIcon className="icon-user" />
      Account
    </HeaderUserWrapper>
  );
};
export default HeaderUser;
