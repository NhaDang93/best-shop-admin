import { Image } from '@/components/shared-components/Image';
import QuantityCart, {
  ProductModel,
} from '@/components/shared-components/QuantityCart';
import { dispatch } from '@/store/app-dispatch';
import { productSelect } from '@/store/slices/app';
import { CloseOutlined } from '@mui/icons-material';
import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  '.MuiListItemText-primary': {},
  cursor: 'pointer',
}));

const BtnRemove = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: '16px',
  top: '8px',
  minWidth: '14px',
  height: '14px',
  padding: 0,
  color: '#6e6b7b',
  background: 'transparent',
  border: '0',
  opacity: '0.6',
  borderRadius: '16px',
}));

const TitleStyled = styled(Typography)(({ theme }: any) => ({
  whiteSpace: 'nowrap',
  width: '100px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#5e5873',
  fontSize: '1.05rem',
  fontWeight: '700',
}));

export const renderFallbackImage = () =>
  'https://oda-link-s3-dev.s3.ap-southeast-1.amazonaws.com/default/logo_odalink.png';
const ItemCart = ({
  cart,
  addCart,
}: {
  cart: ProductModel;
  addCart?: (carts: ProductModel[]) => void;
}) => {
  const handleSelectProduct = () => {
    dispatch(productSelect(cart?.id));
  };

  const handleRemove = () => {
    const productProcess = {
      ...cart,
      cart: { qty: 0 },
    };
    addCart?.([productProcess]);
  };

  return (
    <ListItem style={{ alignItems: 'end' }}>
      <ListItemAvatar>
        <Image
          onClick={handleSelectProduct}
          src={cart?.image?.[0]?.url ?? renderFallbackImage()}
          alt="product"
          height={60}
          width={60}
          style={{
            objectFit: 'cover',
            borderRadius: '4px',
            minWidth: '60px',
            minHeight: '60px',
            cursor: 'pointer',
          }}
        />
      </ListItemAvatar>
      <ListItemTextStyled
        onClick={handleSelectProduct}
        primary={
          <Tooltip placement="top-start" title={cart?.name ?? ''}>
            <TitleStyled>{cart?.name ?? ''}</TitleStyled>
          </Tooltip>
        }
        secondary={cart?.unit_price ?? '0'}
      />
      <div>
        <BtnRemove onClick={handleRemove}>
          <CloseOutlined />
        </BtnRemove>
        <QuantityCart product={cart} />
      </div>
    </ListItem>
  );
};
export default ItemCart;
