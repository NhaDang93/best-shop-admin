import { dispatch } from '@/store/app-dispatch';
import { productSelect } from '@/store/slices/app';
import { HomeOutlined } from '@mui/icons-material';
import { Box, Stack, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { equals } from 'rambda';
import { memo } from 'react';

const TextStyled = styled(Typography)(({ theme }: any) => ({
  color: theme.palette.customColors.tableText,
  fontSize: theme.spacing(4),
  fontWeight: '600',
  noWrap: true,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const IconHomeStyled = styled(HomeOutlined)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  fontSize: '32px',
  color: theme.palette.background.paper,
  cursor: 'pointer',
}));

const TitleStyled = styled(Typography)(({ theme }: any) => ({
  color: '#5e5873',
  fontSize: '1.05rem',
  fontWeight: '700',
}));

interface UsernameCellProps {
  productPrice: number;
  productName?: string;
  picture?: string;
  productUnit: string;
  id?: number;
  qty?: number;
}

let appNumberFormat: Intl.NumberFormat;

export const formatCurrency = (value: number) => {
  if (!appNumberFormat) {
    appNumberFormat = new Intl.NumberFormat();
  }

  return appNumberFormat.format(value);
};

const ProductCellComponent = ({
  productPrice,
  productName,
  picture,
  productUnit,
  id,
  qty,
}: UsernameCellProps) => {
  const handleSelectProduct = () => {
    dispatch(productSelect(id));
  };

  return (
    <Stack direction="row" alignItems="center" overflow="hidden">
      {/* <Image
        src={picture}
        defaultSrc={IMAGE_DEFAULT.PRODUCT}
        alt={productName}
        height={96}
        width={96}
        style={{
          objectFit: 'cover',
          borderRadius: '4px',
          minWidth: '96px',
          minHeight: '96px',
        }}
        onClick={handleSelectProduct}
      /> */}
      <Box sx={{ ml: 2, width: '100%', minWidth: 0 }}>
        <Tooltip
          placement="top-start"
          title={productName ?? ''}
          onClick={handleSelectProduct}
        >
          <TitleStyled style={{ cursor: 'pointer' }}>{productName}</TitleStyled>
        </Tooltip>
        <TextStyled>
          {formatCurrency(productPrice)} vnđ/{productUnit}
        </TextStyled>
        <TextStyled>Số lượng: {qty}</TextStyled>
      </Box>
    </Stack>
  );
};

export const ProductCell = memo(ProductCellComponent, equals);
