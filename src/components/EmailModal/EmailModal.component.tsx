import './EmailModal.css';
import React, { useEffect, useRef } from 'react';

interface IEmailModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

}

function EmailModal(props: IEmailModal) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!modalRef.current) return;

        if (props.showModal) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [props.showModal]);

  return (
    <dialog id="emailModal" className="emailModal" ref={(node: HTMLDialogElement) => { modalRef.current = node; }} onClose={() => { props.setShowModal(false); }}>
      <h2>Heading</h2>
      <input type="email" id="email" name="email" required />
    </dialog>
  );
}

export default EmailModal;