import { Box, Stack, Typography, styled } from '@mui/material';
import { useMemo, useState } from 'react';
import { Image } from './Image';

const ItemStyled = styled(Box)(({ theme }) => ({
  width: theme.spacing(60),
  color: '#454F5B',
  opacity: 0.7,
  fontWeight: 500,
  fontSize: theme.spacing(3.5),
  lineHeight: theme.spacing(6),
  textOverflow: 'ellipsis',
  '@media (min-width:400px)': {
    width: theme.spacing(40),
  },
  '@media (min-width:1024px)': {
    width: theme.spacing(50),
  },
  '@media (min-width:1200px)': {
    width: theme.spacing(60),
  },
  '@media (min-width:1400px)': {
    width: theme.spacing(60),
  },
}));

const ItemTypography = styled(Typography)(({ theme }) => ({
  color: '#454F5B',
  fontSize: '14px',
  fontWeight: 700,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  p: {
    display: 'flex',
    alignItems: 'baseline',
  },
}));

const ItemText = ({
  label,
  text,
  isHiddenText,
}: {
  label?: string;
  text: string;
  isHiddenText?: boolean;
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleShowText = () => {
    setIsShow(!isShow);
  };

  const renderText = useMemo(() => {
    if (!text) {
      return (
        <Stack flexDirection="row" gap="8px" alignItems="center">
          <ItemTypography>-</ItemTypography>
        </Stack>
      );
    }
    if (isShow && text) {
      return (
        <Stack flexDirection="row" gap="8px" alignItems="center">
          <ItemTypography>{text ?? '-'}</ItemTypography>
          <Image
            src="/images/icon/Eye.png"
            onClick={handleShowText}
            style={{ cursor: 'pointer' }}
          />
        </Stack>
      );
    }
    return (
      <Stack flexDirection="row" gap="8px" alignItems="center">
        <ItemTypography>*****</ItemTypography>
        {text && (
          <Image
            src="/images/icon/eye-closed.png"
            onClick={handleShowText}
            style={{ cursor: 'pointer' }}
          />
        )}
      </Stack>
    );
  }, [isShow, text]);

  if (isHiddenText) {
    return (
      <ItemStyled>
        {label && label}
        <ItemTypography>*****</ItemTypography>
      </ItemStyled>
    );
  }
  return (
    <ItemStyled>
      {label && label}
      {renderText}
    </ItemStyled>
  );
};

export default ItemText;
