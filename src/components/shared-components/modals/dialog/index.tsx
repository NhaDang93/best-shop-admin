import * as React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

import Loading from '../../loading';
import { ModalDialogProps } from './ModalDialog';

// Styled Item
const DialogStyled = styled(Dialog)<DialogProps>(({ theme }) => ({
  // Custom Modal small and scroll content
  '.MuiDialogContent-title': {
    paddingBottom: '0px',
  },
  '.close-icon': {
    width: '32px',
    height: '32px',
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer',
    opacity: '0.7',
  },
  '& .MuiDialog-paper:not(.MuiDialog-paperFullScreen)': {
    width: `90% !important`,
    maxWidth: `90% !important`,
    '@media (min-width:200px)': {
      width: `90% !important`,
      maxWidth: `90% !important`,
    },
    '@media (min-width:400px)': {
      width: `90% !important`,
      maxWidth: `90% !important`,
    },
    '@media (min-width:768px)': {
      width: `70% !important`,
      maxWidth: `70% !important`,
    },
  },
  '&.custom-dialog': {
    '& .MuiDialog-paper:not(.MuiDialog-paperFullScreen)': {
      width: `846px !important`,
      maxWidth: `846px !important`,
      overflow: 'hidden',
    },
    '& .MuiDialogContent-root': {
      maxHeight: `calc(100vh - ${theme.spacing(66.5)})`,
      overflow: 'auto',
      paddingBottom: 0,
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
    },
    '& .MuiDialogContent-title': {
      padding: theme.spacing(8, 8, 0),
    },
  },

  '&.custom-dialog-big': {
    '& .MuiDialog-paper:not(.MuiDialog-paperFullScreen)': {
      width: `70% !important`,
      maxWidth: `70% !important`,
      overflow: 'hidden',
    },
    '& .MuiDialogContent-root': {
      maxHeight: `calc(100vh - ${theme.spacing(90)})`,
      overflow: 'auto',
      paddingTop: 0,
    },
    '& .MuiDialogActions-root': {
      paddingTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
    },
    '& .MuiDialogContent-group-title': {
      display: 'none',
    },
  },
  '&.custom-dialog-normal': {
    '& .MuiDialog-paper:not(.MuiDialog-paperFullScreen)': {
      width: `70% !important`,
      maxWidth: `70% !important`,
      overflowY: 'unset',
    },
    '& .MuiDialogContent-root': {
      maxHeight: `calc(100vh - ${theme.spacing(90)})`,
      overflowY: 'unset',
      paddingTop: 0,
    },
    '& .MuiDialogActions-root': {
      paddingTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
    },
    '& .MuiDialogContent-group-title': {
      display: 'none',
    },
  },
  '&.custom-dialog-result-delele-account': {
    '& .MuiDialogContent-group-title': {
      display: 'none',
    },
    '& .MuiDialogTitle-root': {
      display: 'none',
    },
  },
  '& .MuiDialogContent-group-title': {
    marginBottom: theme.spacing(3),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    // textTransform: 'capitalize',
    '& .MuiDialogContent-subTitle': {
      fontSize: theme.spacing(4.5),
      fontWeight: 600,
    },
    '& .MuiDialogContent-desc': {
      fontSize: theme.spacing(3.5),
    },
  },
  '& .MuiDialogContent-desc': {
    fontSize: theme.spacing(3.5),
  },
  '& .MuiDialogContent-title': {
    fontSize: theme.spacing(8.5),
    fontWeight: 500,
    '@media (min-width:200px)': {
      fontSize: '20px',
    },
    '@media (min-width:400px)': {
      fontSize: '24px',
    },
    '@media (min-width:768px)': {
      fontSize: '28px',
    },
  },
  // '& .MuiDialogTitle-root': {
  //   textTransform: 'capitalize',
  // },
}));

const FormDialog = forwardRef<FormDialogRef, ModalDialogProps>(
  function FormDialog(
    {
      icon,
      closeIcon,
      title,
      desc,
      subTitle,
      formComponent,
      onClose: onCloseModal,
      onOpenModal,
      loading,
      classCustom = '',
      subTitleProps,
      ...rest
    },
    ref
  ) {
    const [open, setOpen] = React.useState<boolean>();

    useEffect(() => {
      if (open === false && typeof onCloseModal === 'function') {
        onCloseModal?.();
      }
    }, [open]);

    const onClose = useCallback(() => {
      setOpen(false);
    }, []);

    const onOpen = () => {
      if (onOpenModal && !open) {
        onOpenModal();
      }
      setOpen(true);
    };

    useImperativeHandle(
      ref,
      () => ({
        hide: onClose,
        open: onOpen,
      }),
      []
    );

    return (
      <DialogStyled
        open={open ?? false}
        className={classCustom}
        sx={{
          backgroundColor: 'transparent',
        }}
        {...rest}
      >
        {(!loading && (
          <>
            {closeIcon && closeIcon}
            <DialogTitle className="MuiDialogContent-title">
              <Stack alignItems="center">
                {icon}
                {title}
              </Stack>
            </DialogTitle>
            <Box className="MuiDialogContent-group-title">
              {!!subTitle && (
                <Typography
                  className="MuiDialogContent-subTitle"
                  variant="body1"
                  {...subTitleProps}
                >
                  {subTitle}
                </Typography>
              )}
              {!!desc && (
                <Typography className="MuiDialogContent-desc" variant="body1">
                  {desc}
                </Typography>
              )}
            </Box>
            {formComponent?.()}
          </>
        )) || <Loading />}
      </DialogStyled>
    );
  }
);

export interface FormDialogRef {
  open(): void;

  hide(): void;
}

export default FormDialog;
