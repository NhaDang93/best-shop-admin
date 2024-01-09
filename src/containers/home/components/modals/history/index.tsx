import {
  Box,
  DialogContent,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { Image } from 'src/components/shared-components/Image';
import FormDialog, {
  FormDialogRef,
} from 'src/components/shared-components/modals/dialog';

const HistoryBoxStyled = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  lineHeight: theme.spacing(6),
  fontSize: theme.spacing(4),
  maxHeight: 'calc(100vh - 64px - 54px - 56px)',
}));

const HistoryTypographyStyled = styled(Typography)(({ theme }) => ({
  '&.history-date': {
    color: '#454F5B',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '143%',
    letterSpacing: '0.17px',
  },
  '&.history-time': {
    color: '#B6BEC8',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '12px',
    letterSpacing: '0.15px',
  },
  '&.history-text--normal': {
    color: '#212B36',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '157%',
    letterSpacing: '0.1px',
  },
  '&.history-text--warning': {
    color: '#BE1128',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '157%',
    letterSpacing: '0.1px',
  },
  '&.history-text--note': {
    color: '#B6BEC8',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '166%',
    letterSpacing: '0.1px',
    fontStyle: 'italic',
  },
  '&.history-text--activeType1': {
    width: '64px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '18px',
    letterSpacing: '0.16px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: '#FCA5A6',
  },
  '&.history-text--activeType2': {
    width: '64px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '18px',
    letterSpacing: '0.16px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: '#FFECB3',
  },
  '&.history-text--activeType3': {
    width: '64px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Be VietNam Pro, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '18px',
    letterSpacing: '0.16px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: '#EAEEF2',
  },
}));

const VerticalPointProgressStyled = styled('ul')(({ theme }) => ({
  listStyleType: 'none',
  paddingTop: '24px',
  paddingBottom: '24px',
  'li.default': {
    '::after': {
      border: '1px solid #BE1128',
      backgroundColor: '#BE1128',
    },
  },
  'li.default1': {
    '::after': {
      border: '1px solid #B6BEC8',
      backgroundColor: '#B6BEC8',
    },
  },
  li: {
    paddingLeft: '32px',
    paddingBottom: '24px',
    position: 'relative',
    margin: 0,
    '::after': {
      position: 'absolute',
      top: 0,
      left: -6,
      content: "''",

      borderRadius: '50%',
      display: 'inline-block',
      height: '16px',
      width: '16px',
      textAlign: 'center',
    },
    '::before': {
      position: 'absolute',
      left: '0',
      top: 0,
      content: "''",
      height: '100%',
      width: 0,
      border: '2px solid #D3D8DE',
    },
  },
}));

const HistoryModal = ({
  modalRef,
  title = '',
  onClose,
}: {
  modalRef: React.RefObject<FormDialogRef>;
  title?: string;
  onClose?: () => void;
}) => {
  const theme = useTheme();

  const handleCloseModal = () => {
    onClose?.();
  };

  const formComponent = () => {
    return (
      <Box>
        <DialogContent className="dialog-content-clear">
          <HistoryBoxStyled>
            <VerticalPointProgressStyled>
              <li className="default">
                <Stack flexDirection="row" gap="16px">
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled className="history-date">
                      13/09/2020
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-time">
                      14:00
                    </HistoryTypographyStyled>
                  </Stack>
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled className="history-text--normal">
                      HD000005 Nguyễn Văn Toàn
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--activeType1">
                      Sai SDT
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--note">
                      Ghi chú: Yêu cầu không gọi nữa Ghi chú: Yêu cầu không gọi
                      nữa Ghi chú: Yêu cầu không gọi nữaGhi chú: Yêu cầu không
                      gọi nữa Ghi chú: Yêu cầu không gọi nữaGhi chú: Yêu cầu
                      không gọi nữaGhi chú: Yêu cầu không gọi nữaGhi chú: Yêu
                      cầu không gọi nữaGhi chú: Yêu cầu không gọi nữa
                    </HistoryTypographyStyled>
                  </Stack>
                </Stack>
              </li>
              <li className="default1">
                <Stack flexDirection="row" gap="16px">
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled className="history-date">
                      13/09/2020
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-time">
                      14:00
                    </HistoryTypographyStyled>
                  </Stack>
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled className="history-text--warning">
                      HD000005 Nguyễn Văn Toàn
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--activeType2">
                      Sai SDT
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--note">
                      Ghi chú: Yêu cầu không gọi nữa
                    </HistoryTypographyStyled>
                  </Stack>
                </Stack>
              </li>
              <li className="default1">
                <Stack flexDirection="row" gap="16px">
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled className="history-date">
                      13/09/2020
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-time">
                      14:00
                    </HistoryTypographyStyled>
                  </Stack>
                  <Stack flexDirection="column" gap="8px">
                    <HistoryTypographyStyled>
                      HD000005 Nguyễn Văn Toàn
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--activeType3">
                      Sai SDT
                    </HistoryTypographyStyled>
                    <HistoryTypographyStyled className="history-text--note">
                      Ghi chú: Yêu cầu không gọi nữa
                    </HistoryTypographyStyled>
                  </Stack>
                </Stack>
              </li>
            </VerticalPointProgressStyled>
          </HistoryBoxStyled>
        </DialogContent>
      </Box>
    );
  };

  return (
    <FormDialog
      title={title}
      ref={modalRef}
      formComponent={formComponent}
      onClose={onClose}
      className="custom-dialog"
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

export default HistoryModal;
