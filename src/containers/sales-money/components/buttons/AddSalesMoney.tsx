import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddSalesMoneyModal from '../modals/AddSalesMoney';

const AddSalesMoney = () => {
  const { t } = useTranslation();

  const modalAddSalesMoneyRef = useRef<FormDialogRef>(null);
  const openModalAddSalesMoneyRef = () => {
    modalAddSalesMoneyRef.current?.open();
  };

  const closeModalAddSalesMoneyRef = () => {
    modalAddSalesMoneyRef.current?.hide();
  };

  return (
    <>
      <Button
        sx={{ color: (theme) => theme.palette.background.paper }}
        onClick={openModalAddSalesMoneyRef}
      >
        {t('add_sales_money')}
      </Button>
      <AddSalesMoneyModal
        modalAddSalesMoneyRef={modalAddSalesMoneyRef}
        closeModalAddSalesMoneyRef={closeModalAddSalesMoneyRef}
      />
    </>
  );
};

export default AddSalesMoney;
