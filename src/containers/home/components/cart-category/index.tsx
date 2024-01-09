import EmptyData from '@/components/shared-components/EmptyData';
import { useLayoutContext } from '@/layouts/UnAuthLayout';
import { roundTotal } from '@/utils';
import { DeleteOutlined, HomeOutlined } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import ModalConfirm, { ModalConfirmPropsRef } from '../modals/confirm';
import ItemCart from './item-cart';

const CategoryListWrapper = styled(Card)(({ theme }) => ({
  top: '10px',
  height: '504px',
  display: 'block',
  position: 'sticky',
  width: '25%',
  flex: '0 0 30%',
  maxWidth: '30%',
  transition: '.5s ease-in-out',
  '&.cart-open': {
    bottom: '0',
  },

  '@media (max-width: 1200px)': {
    display: 'block',
    flex: '0 0 100%',
    maxWidth: '100%',
  },

  '@media (max-width: 1000px)': {
    position: 'fixed',
    bottom: '-100%',
    transition: '.5s ease-in-out',
    left: 0,
    zIndex: 999,
    width: '100vw',
    maxHeight: '414px',
    padding: '0!important',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: '20px 20px 0 0',
    top: 'auto',
  },

  '.extra-content': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#f46a6a',
    '.extra-name': {
      fontSize: '14px',
      textDecoration: 'none',
    },
    '.extra-icon': {
      fontSize: '14px',
    },
  },
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  marginBottom: 0,
  minHeight: '3rem',
  padding: '0 1.5rem',
  color: 'rgba(0,0,0,.85)',
  fontWeight: 500,
  fontSize: '1rem',
  backgroundColor: 'transparent',
  borderBottom: '1px solid #f0f0f0',
  borderRadius: '2px 2px 0 0',
  '@media (max-width: 1000px)': {
    minHeight: '48px',
    padding: '0 24px',
    borderRadius: '0 0 0 0',
  },
}));

const CardBodyStyled = styled(CardContent)(({ theme }) => ({
  minHeight: '250px',
  maxHeight: 'calc(100% - 150px)',
  padding: '10px',
  overflowX: 'auto',
  '@media (max-width: 1200px)': {
    minHeight: '150px',
  },
  '@media (max-width: 1000px)': {
    minHeight: '0px',
  },
}));
const NavCheckoutStyled = styled(CardContent)(({ theme }) => ({
  display: 'none',
  '.overlay': {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 998,
    display: 'none',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(17,17,17,.3607843137254902)',
    transition: '.4s',
  },
  '.overlay.open': {
    display: 'block',
  },
  '@media (max-width: 1000px)': {
    position: 'fixed',
    bottom: '0',
    left: '0',
    zIndex: '10',
    display: 'block',
    width: '100%',
    maxHeight: '80px',
    padding: '25px 25px',
    background: '#fff',
  },
  '.icon-cart': {
    color: '#f46a6a',
  },
  '.MuiBadge-badge': {
    color: '#f46a6a',
    background: '#fff',
    border: '1px solid #f46a6a',
    minWidth: '20px',
    height: '20px',
  },
}));

const CardActionsStyled = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-end',
}));

const BtnCheckOut = styled(Button)(({ theme }) => ({
  width: '100%',
  minHeight: '50px',
  color: '#fff',
  fontSize: '1rem',
  fontFamily: 'Noto Sans Bold',
  background: '#f46a6a',
  borderColor: '#f46a6a',
  '&.ant-btn--custom': {
    width: 'auto',
    minHeight: '30px',
    maxHeight: '30px',
    fontSize: '0.75rem',
  },
  ':hover': {
    color: '#fff',
    background: '#f46a6a',
    borderColor: '#f46a6a',
  },
}));

const IconHomeStyled = styled(HomeOutlined)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  fontSize: '32px',
}));

const CartCategory = () => {
  const router = useRouter();

  const { carts, addCart, clearAllCart } = useLayoutContext();
  const modalConfirm = useRef<ModalConfirmPropsRef>(null);

  const [isShowCartMobile, setIsShowCartMobile] = useState(false);

  const totalCart = useMemo(() => {
    let totalProcess = 0;
    carts?.forEach((_cart) => {
      totalProcess += (_cart?.cart?.qty ?? 0) * (_cart?.unit_price ?? 0);
    });
    return totalProcess > 0 ? totalProcess : totalProcess;
  }, [carts]);

  const ButtonClearCart = (
    <a
      style={{
        cursor: carts?.length === 0 ? 'no-drop' : 'pointer',
      }}
      href="#"
      className="extra-content"
      onClick={() => openModalConfirm?.()}
    >
      <span className="extra-name">Clear All</span>
      <span className="extra-icon ">
        <DeleteOutlined />
      </span>
    </a>
  );

  const customizeRenderEmpty = () => <EmptyData />;
  const renderListItemCart = useMemo(() => {
    return (
      <List
        sx={{
          maxHeight: 'calc(100vh - 220px)',
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        {carts?.map((cart) => {
          return <ItemCart key={cart?.id} cart={cart} addCart={addCart} />;
        })}

        {!carts?.length && customizeRenderEmpty()}
      </List>
    );
  }, [carts]);

  const handleShowCart = () => {
    setIsShowCartMobile(!isShowCartMobile);
  };

  const handleBack = () => {
    modalConfirm.current?.hide();
    clearAllCart?.();
  };

  function openModalConfirm() {
    if (carts && carts?.length > 0) {
      modalConfirm.current?.open();
    }
  }

  // const gotoOrderPage = () => {
  //   if (carts && carts?.length > 0) {
  //     router.push(PATH.ORDER);
  //   }
  // };

  return (
    <>
      <NavCheckoutStyled>
        <div
          className={`overlay ${isShowCartMobile ? 'open' : ''}`}
          onClick={handleShowCart}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={4} justifyContent="center">
            <Badge
              badgeContent={carts?.length ?? 0}
              color="primary"
              onClick={handleShowCart}
            >
              <ShoppingCartIcon className="icon-cart" />
            </Badge>
            {carts && carts?.length > 0 && (
              <Typography>Total: {roundTotal(totalCart)} VND</Typography>
            )}
          </Stack>
          {/* <BtnCheckOut
            className="ant-btn--custom"
            type="submit"
            onClick={gotoOrderPage}
            disabled={carts && carts?.length === 0}
          >
            CheckOut
          </BtnCheckOut> */}
        </Stack>
      </NavCheckoutStyled>
      <CategoryListWrapper className={`${isShowCartMobile ? 'cart-open' : ''}`}>
        <CardHeaderStyled
          title={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Giỏ hàng({carts?.length})</Typography>
              {ButtonClearCart}
            </Stack>
          }
        />
        <CardBodyStyled>
          <Box
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {renderListItemCart}
          </Box>
        </CardBodyStyled>
        <CardActionsStyled>
          <Stack
            style={{
              width: '100%',
              paddingTop: '4px',
            }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography>Theo Phí App</Typography>
            <Typography>{roundTotal(20000)} VND</Typography>
          </Stack>
          <Stack
            style={{
              width: '100%',
              paddingTop: '4px',
            }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography>Total</Typography>
            <Typography>{roundTotal(totalCart)} VND</Typography>
          </Stack>
          {/* <BtnCheckOut
            onClick={gotoOrderPage}
            disabled={carts && carts?.length === 0}
            type="submit"
          >
            Check Out
          </BtnCheckOut> */}
        </CardActionsStyled>
      </CategoryListWrapper>

      <ModalConfirm
        ref={modalConfirm}
        title="Confirm"
        subTitle="Are you sure?"
        onClick={handleBack}
      />
    </>
  );
};

export default CartCategory;
