export interface ModalConfirmProps {
  /**
   * Title dialog
   * @default undefined
   */
  title: string;
  /**
   * trigger when click confirm
   */
  onClickConfirm?: () => void;
}
