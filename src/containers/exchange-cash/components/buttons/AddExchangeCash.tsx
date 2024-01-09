import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddExchangeCashModal from '../modals/AddExchangeCash';

const AddExchangeCash = () => {
  const { t } = useTranslation();

  const modalAddExchangeCashRef = useRef<FormDialogRef>(null);
  const openModalAddExchangeCashRef = () => {
    modalAddExchangeCashRef.current?.open();
  };

  const closeModalAddExchangeCashRef = () => {
    modalAddExchangeCashRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddExchangeCashRef}
      >
        {t('add_exchange_cash')}
      </Button>
      <AddExchangeCashModal
        modalAddExchangeCashRef={modalAddExchangeCashRef}
        closeModalAddExchangeCashRef={closeModalAddExchangeCashRef}
      />
    </>
  );
};

export default AddExchangeCash;
