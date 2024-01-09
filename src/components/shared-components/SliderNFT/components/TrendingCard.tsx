import { Box, styled } from '@mui/material';
import { Image } from '../../Image';

const TrendingCardStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
const TCInnerWrapperStyled = styled(Box)(({ theme }) => ({
  background: theme.palette.customColors.tableText,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
}));

const TCContainerStyled = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
}));

const TCUserInfoStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const TrendingCardComponent = () => {
  return (
    <TrendingCardStyled>
      <TCInnerWrapperStyled>
        <TCContainerStyled>
          <Image
            alt="name"
            src="https://static-rs.openlivenft.io/resource/images/convertedOrigin/membership/606dd36b4545dc004e37d021ce242bd1mime_mimejpgmime_mime.webp"
            width={300}
            height={300}
          />
          <TCUserInfoStyled>Details</TCUserInfoStyled>
        </TCContainerStyled>
      </TCInnerWrapperStyled>
    </TrendingCardStyled>
  );
};

export default TrendingCardComponent;
