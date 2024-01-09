import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddSpendingMoneyModal from '../modals/AddSpendingMoney';

const AddSpendingMoney = () => {
  const { t } = useTranslation();

  const modalAddSpendingMoneyRef = useRef<FormDialogRef>(null);
  const openModalAddSpendingMoneyRef = () => {
    modalAddSpendingMoneyRef.current?.open();
  };

  const closeModalAddSpendingMoneyRef = () => {
    modalAddSpendingMoneyRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddSpendingMoneyRef}
      >
        {t('add_spending_money')}
      </Button>
      <AddSpendingMoneyModal
        modalAddSpendingMoneyRef={modalAddSpendingMoneyRef}
        closeModalAddSpendingMoneyRef={closeModalAddSpendingMoneyRef}
      />
    </>
  );
};

export default AddSpendingMoney;
