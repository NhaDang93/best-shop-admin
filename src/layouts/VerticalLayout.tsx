import { BoxProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import SideBarComponent from './components/vertical/SideBar';
import { LayoutProps } from './types';
// import AppBar from './components/vertical/appBar';

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex',
});

const MainContentWrapper = styled(Stack)<BoxProps>({});

const VerticalLayout = (props: LayoutProps) => {
  return (
    <VerticalLayoutWrapper className="layout-wrapper">
      <SideBarComponent />
      <div
        style={{
          position: 'relative',
          left: '187px',
          width: 'calc(100% - 187px)',
          height: '100vh',
        }}
        className="layout-content-wrapper"
      >
        {/* <LayoutAppBar {...props} /> */}
      </div>
    </VerticalLayoutWrapper>
  );
};

export default VerticalLayout;
