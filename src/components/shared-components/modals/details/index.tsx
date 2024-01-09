import { dispatch } from '@/store/app-dispatch';
import { product, productClear } from '@/store/slices/app';
import { Box, Modal, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'src/components/shared-components/Image';
import { IMAGE_DEFAULT } from 'src/constants';
import QuantityCart from '../../QuantityCart';

const ModalBody = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  padding: '16px',
  backgroundColor: theme.palette.background.paper,
  '@media (max-width: 768px)': {
    width: '80%',
  },
  '.box-image': {
    float: 'left',
    width: '140px',
    margin: '0 20px 20px 0',
    '@media (max-width: 768)': {
      width: '100px',
    },
    '@media (max-width: 1024px)': {
      margin: '0 20px 0 0',
    },
    '.img': {
      minWidth: '140px',
      maxHeight: '140px',
      objectFit: 'cover',
      '@media (max-width: 768px)': {
        minWidth: '100px',
        maxHeight: '100px',
      },
    },
  },
  '.box-content': {
    '.title': {
      fontSize: '1rem',
      fontFamily: 'Noto Sans Bold',
      marginTop: '0',
      '@media (max-width: 768px)': {
        whiteSpace: 'wrap',
        width: '200px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    p: {
      marginBottom: '0.5em',
    },
    '.price': {
      fontWeight: 500,
    },
  },
  '.footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
}));

const DetailModal = () => {
  const productsSelector = useSelector(product);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    dispatch(productClear());
    setOpen(false);
  };

  useEffect(() => {
    if (productsSelector?.id) {
      setOpen(true);
    }
  }, [productsSelector?.id]);

  const bodyContent = () => {
    return (
      <ModalBody>
        <div className="box-image">
          <Image
            className="img"
            src={productsSelector?.image?.[0]?.url ?? ''}
            defaultSrc={IMAGE_DEFAULT.PRODUCT}
            alt={productsSelector?.name ?? ''}
            style={{
              borderRadius: '4px',
            }}
          />
        </div>
        <div className="box-content">
          <div className="box-top">
            <h3 className="title">{productsSelector?.name ?? ''}</h3>
            <p className="price">
              {productsSelector?.unit_price ?? ''} vnđ/
              {productsSelector?.unit ?? ''}
            </p>
            <p className="origin">
              Description : {productsSelector?.description ?? ''}
            </p>
            <p className="origin">Origin : {productsSelector?.origin ?? ''}</p>
          </div>
        </div>
        <div className="footer">
          {productsSelector && (
            <QuantityCart
              product={productsSelector as any}
              key={`divQty${productsSelector?.name}`}
            />
          )}
        </div>
      </ModalBody>
    );
  };
  return (
    <Modal open={open} onClose={handleClose}>
      {bodyContent()}
    </Modal>
  );
};

export default DetailModal;
