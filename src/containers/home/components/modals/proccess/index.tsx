import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  styled,
} from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Image } from 'src/components/shared-components/Image';
import SelectMUI from 'src/components/shared-components/designs/select-form';
import TextAreaMUI from 'src/components/shared-components/designs/textArea-form';
import FormDialog, {
  FormDialogRef,
} from 'src/components/shared-components/modals/dialog';
import * as yup from 'yup';

const ProcessButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFC20E',
  textTransform: 'uppercase',
  color: '#454F5B',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#FFC20E',
    color: '#454F5B',
  },
  '&.Mui-disabled': {
    backgroundColor: '#FFC20E',
    color: '#454F5B',
    opacity: '0.3',
  },
}));

export enum ProcessFormEnum {
  TelephoneSale = 'TelephoneSale',
  Note = 'Note',
}
export type ProcessForm = Record<ProcessFormEnum, any>;

const ProcessModal = ({
  modalRef,
  title = '',
  onClose,
  onSuccess,
}: {
  modalRef: React.RefObject<FormDialogRef>;
  title?: string;
  onClose?: () => void;
  onSuccess?: () => void;
}) => {
  const telephoneSale = [
    { id: '1', label: 'Đặng Quốc Nhã' },
    { id: '2', label: 'Phan Đăng Lưu' },
    { id: '3', label: 'Trần Văn Bước' },
  ];

  const formContext = useForm<ProcessForm>({
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          [ProcessFormEnum.TelephoneSale]: yup.string().required(),
          [ProcessFormEnum.Note]: yup.string().notRequired(),
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
    formState: { errors },
  } = formContext;

  const telephoneSaleFormValue = watch(ProcessFormEnum.TelephoneSale);

  const disableProcessButton = useMemo(() => {
    if (telephoneSaleFormValue as string) {
      return false;
    }
    return true;
  }, [telephoneSaleFormValue]);

  const formComponent = () => {
    const renderFooterButton = () => {
      return (
        <ProcessButtonStyled
          disabled={disableProcessButton}
          variant="contained"
          type="submit"
        >
          Chuyển xử lý
        </ProcessButtonStyled>
      );
    };

    return (
      <Box
        noValidate
        id="hook-form"
        component="form"
        onSubmit={handleSubmit?.(onSubmit)}
      >
        <DialogContent className="dialog-content-clear">
          <Stack flexDirection="column" gap="24px">
            <SelectMUI
              value={telephoneSaleFormValue}
              control={control}
              name={ProcessFormEnum.TelephoneSale}
              label="Chuyển tới telesale"
              placeholder="Chuyển tới telesale"
            >
              {telephoneSale?.map((item, index) => (
                <MenuItem value={item?.label} key={index?.toString()}>
                  {item?.label}
                </MenuItem>
              ))}
            </SelectMUI>

            <TextAreaMUI
              control={control}
              label="Ghi chú"
              name={ProcessFormEnum.Note}
            />
          </Stack>
        </DialogContent>
        <DialogActions>{renderFooterButton()}</DialogActions>
      </Box>
    );
  };

  function onSubmit(data?: ProcessForm) {
    onClose?.();
    onSuccess?.();
  }

  const handleCloseModal = () => {
    setValue(ProcessFormEnum.TelephoneSale, null);
    setValue(ProcessFormEnum.Note, undefined);
    onClose?.();
  };

  return (
    <FormDialog
      title={title}
      ref={modalRef}
      formComponent={formComponent}
      onClose={onClose}
      closeIcon={
        <Image
          onClick={handleCloseModal}
          className="close-icon"
          src="/images/icon/close.png"
        />
      }
    />
  );
};

export default ProcessModal;
