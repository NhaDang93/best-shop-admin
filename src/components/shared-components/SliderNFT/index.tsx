import { Box } from '@mui/material';
import Slider from 'react-slick';
import TrendingCardComponent from './components/TrendingCard';
import { TRENDING_NFTS } from './trendingNfts';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderComponent = () => {
  return (
    <section
      style={{
        width: '100%',
        padding: '2em',
        background: 'rgb(255, 255, 255)',
        minHeight: '500px',
        margin: '0em 4em 4em -0.7em',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ display: 'block', width: '100%' }}>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            marginBottom: (theme) => theme.spacing(4),
            position: 'relative',
            display: 'block',
            boxSizing: 'border-box',
            '.slick-prev': {
              width: '40px',
              height: '40px',
              ':before': {
                fontSize: '40px',
                lineHeight: 1,
                opacity: 0.75,
                color: (theme) => theme.palette.grey[800],
              },
            },
            '.slick-next': {
              width: '40px',
              height: '40px',
              ':before': {
                fontSize: '40px',
                lineHeight: 1,
                opacity: 0.75,
                color: (theme) => theme.palette.grey[800],
              },
            },
          }}
        >
          <Slider {...settings}>
            {TRENDING_NFTS.map((_nft) => {
              return <TrendingCardComponent key={_nft?.id} />;
            })}
          </Slider>
        </Box>
      </Box>
    </section>
  );
};

export default SliderComponent;
