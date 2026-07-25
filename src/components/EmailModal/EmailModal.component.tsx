import { useTranslation } from 'react-i18next';
import './EmailModal.css';
import React, { useEffect, useRef } from 'react';
import ActionButton from '../ActionButton';

interface IEmailModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
}

function EmailModal(props: IEmailModal) {
  const { t } = useTranslation(['common', 'email']);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (props.showModal) {
      previouslyFocusedRef.current = props.returnFocusRef.current;
      if (!modal.open) {
        modal.showModal();
      }
      modal.querySelector<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
    } else if (modal.open) {
      modal.close();
    }
  }, [props.returnFocusRef, props.showModal]);

  function closeModal() {
    props.setShowModal(false);
  }

  function handleDialogClose() {
    props.setShowModal(false);
    const elementToFocus = props.returnFocusRef.current ?? previouslyFocusedRef.current;
    if (elementToFocus?.isConnected) {
      window.requestAnimationFrame(() => {
        elementToFocus.focus();
      });
    }
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleDialogCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    closeModal();
  }

  return (
    <dialog
      id="emailModal"
      className="emailModal"
      ref={modalRef}
      aria-labelledby="email-modal-title"
      aria-describedby="email-modal-description"
      aria-modal="true"
      onClick={handleBackdropClick}
      onCancel={handleDialogCancel}
      onClose={handleDialogClose}
    >
      <div className="emailModalInner">
        <h2 id="email-modal-title">{t('title', { ns: 'email' })}</h2>
        <p id="email-modal-description" role="status">{t('notAvailable', { ns: 'email' })}</p>
        <ActionButton label={t('close')} onClick={closeModal} autoFocus />
      </div>
    </dialog>
  );
}

export default EmailModal;
