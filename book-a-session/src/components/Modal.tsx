import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

type ModalProps = {
  title: string;
  confirmText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: ReactNode;
};

export type ModalAPI = {
  show: () => void;
};

const Modal = forwardRef<ModalAPI, ModalProps>(function Modal(
  { title, confirmText, onConfirm, onCancel, children },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        dialogRef.current?.showModal();
      },
    }),
    []
  );

  const onClose = () => {
    dialogRef.current?.close();
    if (onCancel) onCancel();
  }

  const onAccept = () => {
    if (onConfirm) onConfirm();
    dialogRef.current?.close();
  }

  const element: HTMLElement =
    document.getElementById('modal-root') || document.body;

  return createPortal(
    <dialog ref={dialogRef} className='modal'>
      <h4>{title}</h4>
      {children}
      <div className='actions'>
        {onCancel && <Button textOnly onClick={onClose}>
          Cancel
        </Button>}
        {onConfirm && <Button onClick={onAccept}>{confirmText}</Button>}
      </div>
    </dialog>,
    element
  );
});

export default Modal;
