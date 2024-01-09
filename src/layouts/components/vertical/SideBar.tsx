import { GridViewOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material';

const SideBarWrapper = styled('div')({
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100%',
  width: '187px',
  backgroundColor: '#E6E6E6',
});

const LogoDetailsStyled = styled('div')({
  display: 'flex',
  height: '60px',
  width: '100%',
  fontSize: '22px',
  color: '#666666',
  fontWeight: '600',
  alignItems: 'center',
});

const LogoIconStyled = styled(GridViewOutlined)({
  width: '50%',
  height: '50px',
  minWidth: '78px',
  fontSize: '30px',
  color: '#666666',
  textAlign: 'center',
  lineHeight: '50px',
});

const LogoNameStyled = styled('span')({
  fontSize: '22px',
  color: '#666666',
  fontWeight: '600',
});

const NavLinkStyled = styled('ul')({
  height: '100%',
  paddingTop: '40px',
  paddingInlineStart: '0',
  marginLeft: '8px',
  marginRight: '8px',
});

const SubNavLinkStyled = styled('ul')({
  backgroundColor: 'red',
  height: '100%',
  paddingTop: '30px',
  paddingInlineStart: '0',
});

const NavLinkItemStyled = styled('li')({
  listStyle: 'none',
  position: 'relative',
  transition: 'all 0.5s easy',
  marginBottom: '8px',
  marginTop: '8px',
  padding: '8px',
  ':hover': {
    backgroundColor: '#1DA6DD',
  },

  a: {
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 700,
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
  },
});

const LinkNameStyled = styled('span')({
  fontSize: '18px',
  fontWeight: 400,
  color: '#666666',
});

const IOCNLinkStyled = styled('i')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LinkIconStyled = styled(GridViewOutlined)({
  height: '30px',
  minWidth: '40px',
  color: '#666666',
  textAlign: 'center',
  fontSize: '20px',
});

const SideBarComponent = (props: any) => {
  return (
    <SideBarWrapper>
      <LogoDetailsStyled>
        <LogoIconStyled />
      </LogoDetailsStyled>
      <NavLinkStyled>
        <NavLinkItemStyled>
          <a href="#">
            <LinkIconStyled>Icon</LinkIconStyled>
            <LinkNameStyled>Dashboard</LinkNameStyled>
          </a>
        </NavLinkItemStyled>
        <NavLinkItemStyled>
          <a href="#">
            <LinkIconStyled>Icon</LinkIconStyled>
            <LinkNameStyled>Category</LinkNameStyled>
          </a>
        </NavLinkItemStyled>
        <NavLinkItemStyled>
          <IOCNLinkStyled>
            <a href="#">
              <LinkIconStyled>Icon</LinkIconStyled>
              <LinkNameStyled>User</LinkNameStyled>
            </a>
            <ExpandMoreIcon />
          </IOCNLinkStyled>
          {/* <ul
            style={{
              padding: '6px 6px 14px 80px',
              marginTop: '-10px',
              backgroundColor: '#1d1b31',

              //   position: 'absolute',
              //   left: '100%',
              //   top: 0,
              //   marginTop: 0,
              //   padding: '10px 20px',
            }}
            className="submenu"
          >
            <li
              style={{
                fontSize: '18px',
                listStyle: 'none',
                position: 'relative',
                transition: 'all 0.5s easy',
              }}
            >
              <a
                style={{
                  color: '#666666',
                  fontSize: '15px',
                  padding: '5px 0',
                  whiteSpace: 'nowrap',
                  //   display: 'none',
                  opacity: '0.7',
                }}
              >
                Web design
              </a>
            </li>
            <li
              style={{
                fontSize: '18px',
                listStyle: 'none',
                position: 'relative',
                transition: 'all 0.5s easy',
              }}
            >
              <a
                style={{
                  color: '#666666',
                  fontSize: '15px',
                  padding: '5px 0',
                  whiteSpace: 'nowrap',
                  //   display: 'none',
                  opacity: '0.7',
                }}
              >
                Web design
              </a>
            </li>
          </ul> */}
        </NavLinkItemStyled>
        <NavLinkItemStyled>
          <IOCNLinkStyled>
            <a href="#">
              <LinkIconStyled>Icon</LinkIconStyled>
              <LinkNameStyled>Customer</LinkNameStyled>
            </a>
            <ExpandMoreIcon />
          </IOCNLinkStyled>
        </NavLinkItemStyled>
      </NavLinkStyled>
    </SideBarWrapper>
  );
};

export default SideBarComponent;
