interface CancelButton {
  label: string;
  onClick: any;
}

interface ConfirmButton {
  label: string;
  onClick: any;
}
export interface ModalOptions {
  title: string;
  content: JSX.Element;
  cancelButton: CancelButton;
  confirmButton: ConfirmButton;
}
