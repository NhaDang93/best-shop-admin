// ** React Imports
import { dispatch } from '@/store/app-dispatch';
import { styled, useTheme } from '@mui/material/styles';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// ** MUI Imports
import { Box } from '@mui/material';

// ** Layout Imports
// ** Component Import

import { ProductModel } from '@/components/shared-components/QuantityCart';
import DetailModal from '@/components/shared-components/modals/details';
import { ICategory } from '@/containers';
import { homeData } from '@/containers/home/mockData';
import { useCart } from '@/hooks';
import { getListProduct, productList } from '@/store/slices/app';
import { useSelector } from 'react-redux';
import OrderHeaderLayout from './components/header-order';
// import InfoAppBarComponent from 'src/components/shared-components/info-app-bar';

// ** Hook Import

interface Props {
  children: ReactNode;
}

const UnLayoutWrapper = styled('div')({});
const LayoutMUI = styled('div')({});

const LayoutContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '1170px',
  maxWidth: '100%',
  '@media (max-width: 1200px)': {
    width: '1170px',
    maxWidth: '100%',
    paddingRight: '15px',
    paddingLeft: '15px',
  },
  '@media (max-width: 992px)': {
    width: '100%',
    maxWidth: '100%',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  '@media (max-width: 476px)': {
    width: '100%',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
}));

export interface LayoutContextProps {
  toggleMenu?: boolean;
  setToggleMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  addCart?: (product: ProductModel[]) => void;
  carts?: ProductModel[];
  findProductYourCart?: (id: number) => ProductModel[];
  clearAllCart?: () => void;
}

export const LayoutContext = React.createContext<LayoutContextProps>({});

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error(
      'useCompanyListContext must be used within a CompanyListContext.Provider'
    );
  }
  return context;
};

const OrderLayout = ({ children }: Props) => {
  const productsSelector = useSelector(productList);
  const { addCart, carts, clearAllCart, findProductYourCart } = useCart();

  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (!productsSelector?.length) {
      dispatch(getListProduct(homeData?.data?.data?.products as ICategory[]));
    }
  }, []);

  const theme = useTheme();
  const values = useMemo(
    () => ({
      toggleMenu,
      setToggleMenu,
      addCart,
      carts,
      findProductYourCart,
      clearAllCart,
    }),
    // eslint-disable-next-line no-restricted-globals
    [
      toggleMenu,
      setToggleMenu,
      addCart,
      carts,
      findProductYourCart,
      clearAllCart,
    ]
  );
  return (
    <LayoutContext.Provider value={values}>
      <UnLayoutWrapper className="layout-wrapper">
        <LayoutMUI className="layout-mui">
          <LayoutContainer className="layout-container">
            <OrderHeaderLayout />

            <Box>{children}</Box>
          </LayoutContainer>
        </LayoutMUI>
        {productsSelector && <DetailModal />}
      </UnLayoutWrapper>
    </LayoutContext.Provider>
  );
};

export default OrderLayout;
