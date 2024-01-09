// import { DialogProps } from '@mui/material/Dialog';
import { DialogProps, SvgIconTypeMap, TypographyProps } from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { ReactElement } from 'react';

export interface ModalDialogProps extends Omit<DialogProps, 'open'> {
  /**
   * Title dialog
   * @default undefined
   */
  title?: string;
  /**
   * Class custom
   * @default undefined
   */
  classCustom?: string;
  /**
   * Sub title dialog
   * @default undefined
   */
  subTitle?: string;
  /**
   * Description dialog
   * @default undefined
   */
  desc?: string;
  /**
   * Element
   * @default undefined
   */
  formComponent?: () => ReactElement;
  /**
   * Trigger when modal close
   */
  onClose?: () => void;
  /**
   * Trigger when modal open
   */
  onOpenModal?: () => void;
  /**
   *
   */
  loading?: boolean;
  /**
   *
   */
  icon?: Element<OverridableComponent<SvgIconTypeMap> & { muiName: string }>;
  /**
   *
   */
  subTitleProps?: TypographyProps;

  closeIcon?: Element<
    OverridableComponent<SvgIconTypeMap> & { muiName: string }
  >;
}
