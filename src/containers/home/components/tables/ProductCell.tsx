import { dispatch } from '@/store/app-dispatch';
import { productSelect } from '@/store/slices/app';
import { Box, Stack, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { equals } from 'rambda';
import { memo } from 'react';
import { Image } from 'src/components/shared-components/Image';
import { IMAGE_DEFAULT } from 'src/constants';

const TextStyled = styled(Typography)(({ theme }: any) => ({
  color: theme.palette.customColors.tableText,
  fontSize: theme.spacing(4),
  fontWeight: '600',
  noWrap: true,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const TitleStyled = styled(Typography)(({ theme }: any) => ({
  whiteSpace: 'pre-wrap',
  width: '200px',
  height: '50px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#5e5873',
  fontSize: '1.05rem',
  fontWeight: '700',
  '@media (max-width: 768px)': {
    whiteSpace: 'nowrap',
    width: '150px',
    textOverflow: 'ellipsis',
  },
}));

interface UsernameCellProps {
  productPrice: number;
  productName?: string;
  picture?: string;
  productUnit: string;
  id?: number;
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
}: UsernameCellProps) => {
  const handleSelectProduct = () => {
    dispatch(productSelect(id));
  };

  return (
    <Stack direction="row" alignItems="center" overflow="hidden">
      <Image
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
      />
      <Box
        sx={{ ml: 2, width: '100%', minWidth: 0 }}
        onClick={handleSelectProduct}
      >
        <Tooltip placement="top-start" title={productName ?? ''}>
          <TitleStyled>{productName}</TitleStyled>
        </Tooltip>
        <TextStyled>
          {formatCurrency(productPrice)} vnđ/{productUnit}
        </TextStyled>
      </Box>
    </Stack>
  );
};

export const ProductCell = memo(ProductCellComponent, equals);
