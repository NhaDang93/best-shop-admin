import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddImportMoneyModal from '../modals/AddImportMoney';

const AddImportMoney = () => {
  const { t } = useTranslation();

  const modalAddImportMoneyRef = useRef<FormDialogRef>(null);
  const openModalAddImportMoneyRef = () => {
    modalAddImportMoneyRef.current?.open();
  };

  const closeModalAddImportMoneyRef = () => {
    modalAddImportMoneyRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddImportMoneyRef}
      >
        {t('add_import_money')}
      </Button>
      <AddImportMoneyModal
        modalAddImportMoneyRef={modalAddImportMoneyRef}
        closeModalAddImportMoneyRef={closeModalAddImportMoneyRef}
      />
    </>
  );
};

export default AddImportMoney;
