import { useAddMoneyRecordBoardMutation } from '@/apis';
import FormDialog, {
  FormDialogRef,
} from '@/components/shared-components/modals/dialog';
import { formatNumber, responseParams } from '@/utils';

import { PriceTypeEnum } from '@/types';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';

import DatePickerCustom from '@/components/shared-components/designs/date-picker.tsx';
import { IDateRangePicker3 } from '@/components/shared-components/designs/date-range-picker';
import TextAreaMUI from '@/components/shared-components/designs/textArea-form';
import Loading from '@/components/shared-components/loading';
import { SNACK_BAR_DURATION } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { RefObject, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSalesMoneyContext } from '../..';
import PriceInput from '../inputs/Price';

export enum UpdateFormEnum {
  Cash = 'Cash',
  Atm = 'Atm',
  SellOnline = 'Sell online',
  Note = 'Note',
}

export type UpdateForm = Record<UpdateFormEnum, any>;
const AddSalesMoneyModal = ({
  modalAddSalesMoneyRef,
  closeModalAddSalesMoneyRef,
}: {
  modalAddSalesMoneyRef: RefObject<FormDialogRef>;
  closeModalAddSalesMoneyRef: () => void;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const { handleFetchApi } = useSalesMoneyContext();
  const [addMoneyRecordBoard, addMoneyRecordBoardRes] =
    useAddMoneyRecordBoardMutation();

  const [dateSelected, setDateSelected] = useState<IDateRangePicker3 | null>({
    endDate: new Date(),
    startDate: new Date(),
  });

  const formContext = useForm<UpdateForm>({
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          [UpdateFormEnum.Cash]: yup
            .string()
            .required('Cash không được để trống'),
          [UpdateFormEnum.Atm]: yup
            .string()
            .required('ATM không được để trống'),
          [UpdateFormEnum.SellOnline]: yup
            .string()
            .required('Sell online không được để trống'),
          [UpdateFormEnum.Note]: yup
            .string()
            .notRequired()
            .max(500, 'Must be exactly 500 digits'),
        })
      )(data, context, options as any);
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = formContext;
  const AtmFormValue = watch(UpdateFormEnum.Atm);
  const CashFormValue = watch(UpdateFormEnum.Cash);
  const SellOnlineFormValue = watch(UpdateFormEnum.SellOnline);

  async function onSubmit(data?: UpdateForm) {
    const response = await addMoneyRecordBoard?.(
      responseParams({
        priceType: PriceTypeEnum.Sales_Money,
        priceCash: data?.Cash,
        priceATM: data?.Atm,
        priceSellOnline: data?.['Sell online'],
        date: format(dateSelected?.startDate as Date, 'yyyy-MM-dd '),
        note: data?.Note,
      })
    )?.unwrap();

    if (response.responseCode === '00') {
      enqueueSnackbar(response.responseMessage, {
        variant: 'success',
        autoHideDuration: SNACK_BAR_DURATION,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      handleClose?.();
      handleFetchApi?.();
    } else {
      enqueueSnackbar(response.responseMessage, {
        variant: 'error',
        autoHideDuration: SNACK_BAR_DURATION,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  }

  const handleClose = () => {
    reset?.();
    closeModalAddSalesMoneyRef?.();
  };
  // Component FormContainer
  const formComponent = () => {
    // Render Footer Button
    const renderFooterButton = () => {
      return (
        <>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ fontSize: theme.spacing(4), fontWeight: 400 }}
          >
            {t('dialog:cancel')}
          </Button>
          <Button
            variant="contained"
            disabled={!isValid || !dateSelected?.startDate}
            onClick={handleSubmit?.(onSubmit)}
            sx={{ fontSize: theme.spacing(4), fontWeight: 400 }}
          >
            {t('dialog:success')}
          </Button>
        </>
      );
    };

    return (
      <Box
        noValidate
        id="hook-form1"
        component="form"
        onSubmit={handleSubmit?.(onSubmit)}
      >
        <DialogContent>
          <DialogContentText>
            <Stack
              flexDirection="row"
              style={{ width: '100%', flexWrap: 'wrap' }}
              gap="12px"
              sx={{
                '@media (max-width:1024px)': {
                  flexWrap: 'wrap',
                  gap: '16px',
                },
              }}
            >
              <Box
                sx={{
                  width: '25%',
                  '@media (max-width:768px)': {
                    width: '100%',
                  },
                }}
              >
                <DatePickerCustom
                  setDateSelected={setDateSelected}
                  dateSelected={dateSelected}
                />
              </Box>

              <Stack sx={{ width: '100%' }} gap="12px">
                <PriceInput
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={UpdateFormEnum.Cash}
                  label="Cash"
                  placeholder="Enter Cash"
                  errorMessage={
                    errors?.[UpdateFormEnum.Cash]?.message as string
                  }
                />
                <PriceInput
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={UpdateFormEnum.Atm}
                  label="ATM"
                  placeholder="Enter ATM"
                  errorMessage={errors?.[UpdateFormEnum.Atm]?.message as string}
                />
                <PriceInput
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={UpdateFormEnum.SellOnline}
                  label="Sell Online"
                  placeholder="Enter Sell Online"
                  errorMessage={
                    errors?.[UpdateFormEnum.SellOnline]?.message as string
                  }
                />
                <TextAreaMUI
                  control={control}
                  label="Note"
                  name={UpdateFormEnum.Note}
                  row={1}
                  placeholder="Dưới 500 ký tự có dấu"
                  style={{ backgroundColor: 'white' }}
                  errorMessage={
                    errors?.[UpdateFormEnum.Note]?.message as string
                  }
                />
              </Stack>
              <Stack
                flexDirection="column"
                justifyContent="start"
                style={{ width: '100%' }}
                alignItems="end"
              >
                <Box>
                  {dateSelected?.startDate && (
                    <Stack
                      flexDirection="row"
                      sx={{
                        minWidth: '100px',
                        display: 'flex',
                        justifyContent: 'end',
                        flex: 1,
                      }}
                    >
                      {format(dateSelected?.startDate as Date, 'yyyy-MM-dd ')}
                    </Stack>
                  )}
                  {CashFormValue && (
                    <Stack flexDirection="row" gap="12px">
                      <Typography width="100px">Cash</Typography>
                      <Typography
                        sx={{
                          minWidth: '100px',
                          display: 'flex',
                          justifyContent: 'end',
                          flex: 1,
                        }}
                      >
                        {formatNumber(CashFormValue)} VNĐ
                      </Typography>
                    </Stack>
                  )}
                  {AtmFormValue && (
                    <Stack flexDirection="row">
                      <Typography width="100px">ATM</Typography>
                      <Typography
                        sx={{
                          minWidth: '100px',
                          display: 'flex',
                          justifyContent: 'end',
                          flex: 1,
                        }}
                      >
                        {formatNumber(AtmFormValue)} VNĐ
                      </Typography>
                    </Stack>
                  )}
                  {SellOnlineFormValue && (
                    <Stack flexDirection="row">
                      <Typography width="100px">Sell Online</Typography>{' '}
                      <Typography
                        sx={{
                          minWidth: '100px',
                          display: 'flex',
                          justifyContent: 'end',
                          flex: 1,
                        }}
                      >
                        {' '}
                        {formatNumber(SellOnlineFormValue)} VNĐ
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Stack>
          </DialogContentText>
        </DialogContent>

        <DialogActions>{renderFooterButton()}</DialogActions>
      </Box>
    );
  };

  return (
    <>
      <FormDialog
        title={t('add_sales_money')}
        ref={modalAddSalesMoneyRef}
        formComponent={formComponent}
      />
      {addMoneyRecordBoardRes?.isLoading && <Loading />}
    </>
  );
};

export default AddSalesMoneyModal;
