import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddHouseMoneyModal from '../modals/AddHouseMoney';

const AddHouseMoney = () => {
  const { t } = useTranslation();

  const modalAddHouseMoneyRef = useRef<FormDialogRef>(null);
  const openModalAddHouseMoneyRef = () => {
    modalAddHouseMoneyRef.current?.open();
  };

  const closeModalAddHouseMoneyRef = () => {
    modalAddHouseMoneyRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddHouseMoneyRef}
      >
        {t('add_house_money')}
      </Button>
      <AddHouseMoneyModal
        modalAddHouseMoneyRef={modalAddHouseMoneyRef}
        closeModalAddHouseMoneyRef={closeModalAddHouseMoneyRef}
      />
    </>
  );
};

export default AddHouseMoney;
