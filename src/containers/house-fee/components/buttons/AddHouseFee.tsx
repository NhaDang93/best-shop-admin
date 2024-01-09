import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddHouseFeeModal from '../modals/AddHouseFee';

const AddHouseFee = () => {
  const { t } = useTranslation();

  const modalAddHouseFeeRef = useRef<FormDialogRef>(null);
  const openModalAddHouseFeeRef = () => {
    modalAddHouseFeeRef.current?.open();
  };

  const closeModalAddHouseFeeRef = () => {
    modalAddHouseFeeRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddHouseFeeRef}
      >
        {t('add_house_fee')}
      </Button>
      <AddHouseFeeModal
        modalAddHouseFeeRef={modalAddHouseFeeRef}
        closeModalAddHouseFeeRef={closeModalAddHouseFeeRef}
      />
    </>
  );
};

export default AddHouseFee;
