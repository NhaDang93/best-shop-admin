import { useUpdateMoneyRecordBoardMutation } from '@/apis';
import SelectMUI from '@/components/shared-components/designs/select-form';
import FormDialog, {
  FormDialogRef,
} from '@/components/shared-components/modals/dialog';
import { IHouseMoney, PriceTypeEnum } from '@/types';
import {
  backgroundStatusContract,
  formatNumber,
  responseParams,
} from '@/utils';
import { format, parseISO } from 'date-fns';
import getYear from 'date-fns/getYear';
import { vi } from 'date-fns/locale';
import { useSnackbar } from 'notistack';

import TextAreaMUI from '@/components/shared-components/designs/textArea-form';
import Loading from '@/components/shared-components/loading';
import { SNACK_BAR_DURATION } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { RefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useHouseMoneyContext } from '../..';
import PriceInput from '../inputs/Price';

export enum UpdateFormEnum {
  Month = 'Month',
  Year = 'Year',
  Cash = 'Cash',
  Atm = 'Atm',
  Note = 'Note',
}

export type UpdateForm = Record<UpdateFormEnum, any>;
const UpdateHouseMoneyModal = ({
  modalUpdateHouseMoneyRef,
  closeModalUpdateHouseMoneyRef,
  row,
}: {
  modalUpdateHouseMoneyRef: RefObject<FormDialogRef>;
  closeModalUpdateHouseMoneyRef: () => void;
  row: IHouseMoney;
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { convertListMonth, convertListYear, handleFetchApi } =
    useHouseMoneyContext();
  const [updateMoneyRecordBoard, updateMoneyRecordBoardRes] =
    useUpdateMoneyRecordBoardMutation();

  const formContext = useForm<UpdateForm>({
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          [UpdateFormEnum.Month]: yup
            .string()
            .required('Month không được để trống'),
          [UpdateFormEnum.Year]: yup
            .string()
            .required('Year không được để trống'),
          [UpdateFormEnum.Atm]: yup
            .string()
            .required('ATM không được để trống'),
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
  const MonthFormValue = watch(UpdateFormEnum.Month);
  const YearFormValue = watch(UpdateFormEnum.Year);

  useEffect(() => {
    try {
      const parsedTime = parseISO(row?.price?.date ?? '');
      const formattedTime = format(parsedTime, 'yyyy-MM-dd ');
      setValue(UpdateFormEnum.Atm, row?.priceATM ?? '0');
      setValue(UpdateFormEnum.Cash, row?.priceCash ?? '0');
      setValue(
        UpdateFormEnum.Month,
        format(new Date(formattedTime), 'LLL', { locale: vi })
      );
      setValue(
        UpdateFormEnum.Month,
        format(new Date(formattedTime), 'LLL', { locale: vi })
      );

      setValue(UpdateFormEnum.Year, getYear(new Date(formattedTime)));
      setValue(UpdateFormEnum.Note, row?.note);
    } catch (e) {
      console.log('e', e);
    }
  }, [row]);
  async function onSubmit(data?: UpdateForm) {
    const response = await updateMoneyRecordBoard?.(
      responseParams({
        priceType: PriceTypeEnum.House_Money,
        priceCash: data?.Cash,
        priceATM: data?.Atm,
        priceSellOnline: '0',
        date: row?.price?.date,
        _id: row?._id,
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
    closeModalUpdateHouseMoneyRef?.();
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
            disabled={!isValid}
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
              justifyContent="center"
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
              <SelectMUI
                control={control}
                name={UpdateFormEnum.Month}
                disabled
                label={t('select_month')}
                errorMessage={errors?.[UpdateFormEnum.Month]?.message as string}
                sx={{
                  flex: '1',
                  '.MuiInputBase-root': {
                    height: '40px',
                    fontSize: '16px',
                  },
                  '.MuiFormLabel-root': {
                    fontSize: '19px',
                    lineHeight: '1.25em',
                    '@media (min-width:200px)': {
                      fontSize: '12px',
                    },
                    '@media (min-width:400px)': {
                      fontSize: '14px',
                    },
                    '@media (min-width:768px)': {
                      fontSize: '16px',
                    },
                  },
                }}
                displayEmpty
                renderValue={(selected) => {
                  const backgroundColorStatus = backgroundStatusContract(
                    (selected as string) ?? ''
                  );

                  if (!selected) {
                    return <div />;
                  }
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      <Chip
                        sx={{
                          minWidth: '128px',
                          display: 'flex',
                          fontFamily: 'Be VietNam Pro, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          letterSpacing: '0.16px',
                          height: '24px',
                          cursor: 'pointer',
                          backgroundColor: backgroundColorStatus,
                          '@media (min-width:200px)': {
                            minWidth: '80px',
                          },
                          '@media (min-width:400px)': {
                            minWidth: '80px',
                          },
                          '@media (min-width:768px)': {
                            minWidth: '80px',
                          },
                        }}
                        key={`${selected}`}
                        label={`${selected}`}
                      />
                    </Box>
                  );
                }}
              >
                <MenuItem key="empty" value="">
                  {t('select_month')}
                </MenuItem>
                {convertListMonth?.map((_convertListMonth) => (
                  <MenuItem
                    key={_convertListMonth?.id}
                    value={_convertListMonth.name}
                  >
                    {_convertListMonth.name}
                  </MenuItem>
                ))}
              </SelectMUI>

              <SelectMUI
                control={control}
                disabled
                name={UpdateFormEnum.Year}
                errorMessage={errors?.[UpdateFormEnum.Year]?.message as string}
                label={t('select_year')}
                sx={{
                  flex: '1',
                  '.MuiInputBase-root': {
                    height: '40px',
                    fontSize: '16px',
                  },
                  '.MuiFormLabel-root': {
                    fontSize: '19px',
                    lineHeight: '1.25em',
                    '@media (min-width:200px)': {
                      fontSize: '12px',
                    },
                    '@media (min-width:400px)': {
                      fontSize: '14px',
                    },
                    '@media (min-width:768px)': {
                      fontSize: '16px',
                    },
                  },
                }}
                displayEmpty
                renderValue={(selected) => {
                  const backgroundColorStatus = backgroundStatusContract(
                    (selected as string) ?? ''
                  );

                  if (!selected) {
                    return <div />;
                  }
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      <Chip
                        sx={{
                          minWidth: '128px',
                          display: 'flex',
                          fontFamily: 'Be VietNam Pro, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          letterSpacing: '0.16px',
                          height: '24px',
                          cursor: 'pointer',
                          backgroundColor: backgroundColorStatus,
                          '@media (min-width:200px)': {
                            minWidth: '80px',
                          },
                          '@media (min-width:400px)': {
                            minWidth: '80px',
                          },
                          '@media (min-width:768px)': {
                            minWidth: '80px',
                          },
                        }}
                        key={`${selected}`}
                        label={`${selected}`}
                      />
                    </Box>
                  );
                }}
              >
                <MenuItem key="empty" value="">
                  {t('select_year')}
                </MenuItem>
                {convertListYear?.map((_convertListYear) => (
                  <MenuItem
                    key={_convertListYear?.id}
                    value={_convertListYear.name}
                  >
                    {_convertListYear.name}
                  </MenuItem>
                ))}
              </SelectMUI>
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
                  {(MonthFormValue || YearFormValue) && (
                    <Stack
                      flexDirection="row"
                      sx={{
                        minWidth: '100px',
                        display: 'flex',
                        justifyContent: 'end',
                        flex: 1,
                      }}
                    >
                      {MonthFormValue} năm {YearFormValue}{' '}
                    </Stack>
                  )}
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
        title="Update House Money"
        ref={modalUpdateHouseMoneyRef}
        formComponent={formComponent}
      />
      {updateMoneyRecordBoardRes?.isLoading && <Loading />}
    </>
  );
};

export default UpdateHouseMoneyModal;
