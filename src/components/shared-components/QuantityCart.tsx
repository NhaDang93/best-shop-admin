import { useLayoutContext } from '@/layouts/UnAuthLayout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, styled } from '@mui/material';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import InputQty from './InputChangeQty';

const QuantityCartWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const BtnSub = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: '#f46a6a',
  border: 0,
  borderRadius: '5px',
  width: '24px',
  height: '24px',
  padding: '0',
  fontSize: '14px',

  '&.MuiButtonBase-root': {
    minWidth: '24px',
  },
  ':hover': {
    color: '#fff',
    background: '#f46a6a',
    opacity: 0.7,
  },
}));

const BtnAdd = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: '#f46a6a',
  border: 0,
  borderRadius: '5px',
  width: '24px',
  height: '24px',
  padding: '0',
  fontSize: '14px',

  '&.MuiButtonBase-root': {
    minWidth: '24px',
  },
  ':hover': {
    color: '#fff',
    background: '#f46a6a',
    opacity: 0.7,
  },
}));

export type ProductModel = {
  key?: number;
  id: number;
  name: string;
  origin?: string;
  description?: string;
  unit: string;
  unit_price: number;
  stock: number;
  brand?: string;
  stock_alert: number;
  cart: {
    qty: number;
  };
  image: [
    {
      name: string;
      url: string;
    }
  ];
  store_name?: string;
  supplier_id?: number;
  url?: {
    id: number;
    url: string;
    uuid?: string;
  };
};

const QuantityCart = ({ product }: { product: ProductModel }) => {
  const { addCart, carts } = useLayoutContext();

  const [productCopy, setProductCopy] = useState<ProductModel>({
    ...product,
  });

  useEffect(() => {
    if (carts && carts?.length > 0) {
      const productInitialState = carts?.find(
        (item) => item?.id === productCopy?.id
      );
      if (productInitialState) {
        setProductCopy(productInitialState);
      }
      if (!productInitialState) {
        setProductCopy({
          ...product,
          cart: { qty: product?.cart?.qty ? product?.cart?.qty : 0 },
        });
      }
    } else {
      setProductCopy({
        ...product,
        cart: { qty: product?.cart?.qty ? product?.cart?.qty : 0 },
      });
    }
  }, [carts]);

  const onAmountChange = async (quantity: number) => {
    const productProcess = {
      ...productCopy,
      cart: { qty: (productCopy?.cart?.qty ?? 0) + quantity },
    };
    addCart?.([productProcess]);
  };

  const onAmountChangeCartInput = async (quantity: number) => {
    const productProcess = {
      ...productCopy,
      cart: { qty: quantity },
    };
    addCart?.([productProcess]);
  };

  const onAmountChangeInput = async (e: string) => {
    const decimalPoint = e.replace(',', '.');
    if (
      (!parseFloat(decimalPoint) && parseFloat(decimalPoint) !== 0) ||
      parseFloat(decimalPoint) < 0
    ) {
      setProductCopy({ ...product });
      onAmountChangeCartInput(product?.cart?.qty ?? 0);
      return;
    }
    if (decimalPoint === '' || parseFloat(decimalPoint) === 0) {
      setProductCopy({ ...product, cart: { qty: 0 } });
      onAmountChangeCartInput(0);
    } else {
      const quantity = parseFloat(parseFloat(decimalPoint).toFixed(3));

      try {
        if (quantity === 0 || quantity === undefined || quantity === null) {
          setProductCopy({
            ...product,
            cart: { qty: 0 },
          });
          onAmountChange(0);
        } else {
          setProductCopy({
            ...product,
            cart: { qty: quantity },
          });
          onAmountChangeCartInput(quantity);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const decrease = debounce(
    function () {
      onAmountChange(-1);
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );
  // increase Qty //
  const increase = debounce(
    function () {
      onAmountChange(1);
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  return (
    <QuantityCartWrapper>
      <BtnSub size="small" onClick={decrease}>
        <RemoveIcon />
      </BtnSub>
      <InputQty
        qty={productCopy?.cart?.qty}
        id={productCopy?.id?.toString() ?? ''}
        handlerChangeCart={onAmountChangeInput}
      />
      <BtnAdd size="small" onClick={increase}>
        <AddIcon />
      </BtnAdd>
    </QuantityCartWrapper>
  );
};

export default QuantityCart;
