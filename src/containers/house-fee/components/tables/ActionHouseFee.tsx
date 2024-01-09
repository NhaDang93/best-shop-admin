import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { equals } from 'rambda';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeleteMoneyRecordBoardMutation } from '@/apis';
import Loading from '@/components/shared-components/loading';
import ModalConfirmBack, {
  ModalConfirmBackPropsRef,
} from '@/components/shared-components/modal-confirm-back';
import { FormDialogRef } from '@/components/shared-components/modals/dialog';
import { SNACK_BAR_DURATION } from '@/constants';
import { IHouseFee } from '@/types';
import { responseParams } from '@/utils';
import { DeleteOutline, ModeEditOutlineOutlined } from '@mui/icons-material';
import { useHouseFeeContext } from '../..';
import UpdateHouseFeeModal from '../modals/UpdateHouseFee';

const ActionHouseFee = ({ row }: { row: IHouseFee }) => {
  const { t } = useTranslation();

  const { handleFetchApi } = useHouseFeeContext();

  const [deleteMoneyRecordBoard, deleteMoneyRecordBoardRes] =
    useDeleteMoneyRecordBoardMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const modalConfirmDeleteRef = useRef<ModalConfirmBackPropsRef>(null);
  const modalUpdateHouseFeeRef = useRef<FormDialogRef>(null);

  const { enqueueSnackbar } = useSnackbar();

  const open = Boolean(anchorEl);

  const router = useRouter();

  const theme = useTheme();

  const openModalConfirmDeleteRef = () => {
    modalConfirmDeleteRef.current?.open();
  };

  const closeModalConfirmDeleteRef = () => {
    modalConfirmDeleteRef.current?.hide();
  };

  const openModalUpdateHouseFeeRef = () => {
    modalUpdateHouseFeeRef.current?.open();
  };

  const closeModalUpdateHouseFeeRef = () => {
    modalUpdateHouseFeeRef.current?.hide();
  };

  const handleConfirmDelete = async () => {
    closeModalConfirmDeleteRef?.();
    const resDelete = await deleteMoneyRecordBoard?.(
      responseParams({
        date: row.price?.date,
        _id: row?._id,
      })
    )?.unwrap();
    if (resDelete?.responseCode === '00') {
      enqueueSnackbar(resDelete?.responseMessage, {
        variant: 'success',
        autoHideDuration: SNACK_BAR_DURATION,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      handleFetchApi?.();
    } else {
      enqueueSnackbar(resDelete?.responseMessage, {
        variant: 'error',
        autoHideDuration: SNACK_BAR_DURATION,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    openModalUpdateHouseFeeRef?.();
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
    openModalConfirmDeleteRef();
  };

  return (
    <>
      <IconButton
        sx={{ color: theme.palette.customColors.summaryTitleColor }}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <ModeEditOutlineOutlined fontSize="small" color="secondary" />
          <Typography sx={{ fontWeight: 400, ml: 1 }} color="secondary">
            {t('edit')}
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <DeleteOutline color="error" fontSize="small" />
          <Typography sx={{ fontWeight: 400, ml: 1 }} color="error">
            {t('delete')}
          </Typography>
        </MenuItem>
      </Menu>
      <ModalConfirmBack
        title="Delete"
        subTitle={`Are you sure Delete? ${row.price?.date}`}
        ref={modalConfirmDeleteRef}
        onClick={handleConfirmDelete}
      />
      {deleteMoneyRecordBoardRes.isLoading && <Loading />}

      <UpdateHouseFeeModal
        modalUpdateHouseFeeRef={modalUpdateHouseFeeRef}
        closeModalUpdateHouseFeeRef={closeModalUpdateHouseFeeRef}
        row={row}
      />
    </>
  );
};

export default React.memo(ActionHouseFee, equals);