import { useTranslation } from 'react-i18next';
import './EmailModal.css';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ActionButton from '../ActionButton';

interface IEmailModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

}

function EmailModal(props: IEmailModal) {
  const { t } = useTranslation(['common', 'email']);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isEmailSubmissionLoading, setIsEmailSubmissionLoading] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  useEffect(() => {
    openOrCloseModal(props.showModal);
  }, [props.showModal]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsEmailSubmissionLoading(true);
    setTimeout(() => { 
      setIsEmailSubmissionLoading(false);
      setIsEmailSubmitted(true) 
    }, 700);
  }

  function openOrCloseModal(open = false) {
    if (!modalRef.current) return;

    if (open) {
        modalRef.current.showModal();
    } else {
        modalRef.current.close();
        setIsEmailSubmitted(false); 
    }
  }

  function closeModal() {
    setIsEmailSubmissionLoading(false);
    props.setShowModal(false);
  }

  return (
    <dialog id="emailModal" className="emailModal" ref={(node: HTMLDialogElement) => { modalRef.current = node; }} onClick={closeModal} onClose={() => {closeModal}}>
      <div className="emailModalInner" onClick={(e) => { e.stopPropagation() }}>
        {!isEmailSubmitted ?
        (<>
          <h2>{t('title', { ns: 'email' })}</h2>
          <form onSubmit={handleSubmit}>
            <div className="emailInput">
              <label htmlFor="email">{t('emailAddress')}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <ActionButton loading={isEmailSubmissionLoading ? "true" : undefined} label={t('subscribe', { ns: 'email' })} type="submit" id="subscribe" />
          </form>
        </>)
        : (<>
          <h2>{t('successTitle', { ns: 'email' })}</h2>
          <h3>{t('successSubtitle', { ns: 'email' })}</h3>
          <ActionButton label={t('close')} onClick={closeModal} />
        </>)
        }
      </div>
    </dialog>
  );
}

export default EmailModal;