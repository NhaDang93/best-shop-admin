import Loading from '@/components/shared-components/loading';
import { useLayoutContext } from '@/layouts/UnAuthLayout';
import { roundTotal } from '@/utils';
import { Button, Stack, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { ProductCell } from './component/ProductCell';
import ModalConfirm, { ModalConfirmPropsRef } from './component/modals/confirm';

const OrderWrapper = styled('div')(({ theme }) => ({
  marginTop: '3rem',
}));
const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
}));

const BodyContainer = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '1.5rem',

  '@media (max-width: 576px)': {
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
  },
}));

const OrderContainer = styled('div')(({ theme }) => ({
  width: '21cm',
  minHeight: '29.7cm',
  padding: '2cm',
  margin: '1cm auto',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media (max-width: 576px)': {
    width: '100%',
    minHeight: 'auto',
    padding: '1rem',
    margin: '1rem auto',
  },
}));

const BtnOrder = styled(Button)(({ theme }) => ({
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

export interface IProduct {
  id: number;
  name?: string;
  unit?: string;
  unit_price?: number;
  stock?: number;
  brand?: string;
  origin?: string;
  description?: string;
  stock_alert?: number;
  image?: {
    name?: string;
    url?: string;
    logo_print?: string | null;
  }[];
}

export interface ICategory {
  category_id?: number;
  category_name?: string;
  count_products?: number;
  products?: IProduct[];
}

export interface ICategoryType {
  id?: number;
  name?: string;
}

const ORDER_ID = 'orderID';
const OrderComponent = () => {
  const router = useRouter();
  const { carts, clearAllCart } = useLayoutContext();
  const modalConfirm = useRef<ModalConfirmPropsRef>(null);

  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    const element = document.getElementById(ORDER_ID);
    if (element) {
      setLoading(true);
      html2canvas(element, {
        logging: true,
        useCORS: true,
      }).then(function (canvas) {
        const image = canvas.toDataURL('image/png', 1.0);
        downloadImage(
          image,
          `order${dayjs(new Date()).format('YYYY-MM-DD mm-ss')}`
        );
        setLoading(false);
        modalConfirm.current?.open();
      });
    }
  };

  const handleBack = () => {
    modalConfirm.current?.hide();
    clearAllCart?.();
    router.push('/');
  };

  const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.download = fileName;
    fakeLink.style.display = 'none';
    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    URL.revokeObjectURL(fakeLink.href);
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const totalCart = useMemo(() => {
    let totalProcess = 0;
    carts?.forEach((_cart) => {
      totalProcess += (_cart?.cart?.qty ?? 0) * (_cart?.unit_price ?? 0);
    });
    return totalProcess > 0 ? totalProcess : totalProcess;
  }, [carts]);
  const renderCart = useMemo(() => {
    return carts?.map((_cart) => {
      return (
        <ProductCell
          productPrice={_cart?.unit_price ?? ''}
          productName={_cart?.name ?? ''}
          productUnit={_cart?.unit ?? ''}
          picture={_cart?.image?.[0]?.url}
          key={_cart?.id}
          qty={_cart?.cart?.qty}
          id={_cart?.id}
        />
      );
    });
  }, [carts]);

  return (
    <OrderWrapper>
      {loading && <Loading />}
      <BtnOrder
        style={{ margin: '1rem' }}
        type="button"
        variant="contained"
        onClick={handleClick}
      >
        Xuất Ảnh
      </BtnOrder>

      <BodyContainer>
        <OrderContainer id={ORDER_ID}>
          <Stack flexDirection="row" justifyContent="center">
            <TitleTypography>Thông tin đơn hàng</TitleTypography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography>Ngày tạo đơn hàng</Typography>
            <Typography>{dayjs(new Date()).format('YYYY-MM-DD')}</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography>Theo Phí App</Typography>
            <Typography>{roundTotal(20000)} VND</Typography>
          </Stack>

          <Stack flexDirection="row" justifyContent="space-between">
            <Typography>Tổng tiền</Typography>
            <Typography>{roundTotal(totalCart)}VND</Typography>
          </Stack>
          {renderCart}
        </OrderContainer>
      </BodyContainer>
      <ModalConfirm
        ref={modalConfirm}
        title=""
        subTitle="Xuất ảnh thành công, kiểm tra thư mục của bạn và gửi cho ảnh cho shop"
        onClick={handleBack}
      />
    </OrderWrapper>
  );
};

export const Order = OrderComponent;
