import { Box, Button, Typography } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Image } from '../../Image';
import { ModalConfirmProps } from './ModalConfirm';

// Styled Item
const DialogStyled = styled(Dialog)<DialogProps>(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: '1.375rem 1.5rem .5rem',
  },
  '& .MuiDialogContent-group-title': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1em',
    marginBottom: theme.spacing(5),
    paddingRight: theme.spacing(9),
    paddingLeft: theme.spacing(9),
    '& .MuiDialogContent-title': {
      fontSize: theme.spacing(4.5),
      fontWeight: 600,
      textAlign: 'center',
      padding: '0',
    },
  },
}));

const OkButtonStyled = styled(Button)(({ theme }) => ({
  width: '208px',
  backgroundColor: '#FFC20E',
  textTransform: 'uppercase',
  color: '#454F5B',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '14px',
  float: 'right',
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

const ModalConfirmChange = forwardRef<ModalConfirmChangeRef, ModalConfirmProps>(
  function FormDialog({ title, onClickConfirm }, ref) {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const onClose = () => {
      setOpen(false);
    };

    const onOpen = () => {
      setOpen(true);
    };

    useImperativeHandle(
      ref,
      () => ({
        hide: onClose,
        open: onOpen,
      }),
      [ref]
    );

    return (
      <DialogStyled open={open} onClose={onClose}>
        <DialogTitle className="MuiDialogContent-title">
          <Image
            style={{ height: '28px' }}
            className="close-icon"
            src="/images/icon/confirm.png"
          />
        </DialogTitle>
        <Box className="MuiDialogContent-group-title">
          <Typography className="MuiDialogContent-title" variant="body1">
            {title}
          </Typography>
          <OkButtonStyled onClick={onClose}>Ok</OkButtonStyled>
        </Box>
      </DialogStyled>
    );
  }
);

export interface ModalConfirmChangeRef {
  open(): void;

  hide(): void;
}

export default ModalConfirmChange;
