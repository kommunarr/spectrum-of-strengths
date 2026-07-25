import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './Contact.css';
import ActionButton from '../../components/ActionButton';

function Contact() {
    const [contactFormAttempted, setContactFormAttempted] = useState(false);

    const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setContactFormAttempted(true);
    };

    const { t } = useTranslation(['contactUs', 'common']);
    return (
        <div>
            <h1>{t('contactUs')}</h1>
            <form
                onSubmit={handleSubmitClick}
                aria-describedby={contactFormAttempted ? 'contact-form-status' : undefined}
            >
                    <fieldset aria-describedby="contact-form-required">
                        <legend>{t('contactUs')}</legend>
                        <p className="formHint" id="contact-form-required">{t('requiredFields')}</p>
                        <div className="formField">
                            <label htmlFor="nameInput">{t('nameInput')}</label>
                            <input id="nameInput" name="nameInput" type="text" required autoComplete="name" />
                        </div>
                        
                        <div className="formField">
                            <label htmlFor="emailInput">{t('emailAddress', { ns: 'common'} )}</label>
                            <input id="emailInput" name="emailInput" type="email" required autoComplete="email" />
                        </div>

                        <div className="formField">
                            <label htmlFor="subjectInput">{t('subjectInput')}</label>
                            <input id="subjectInput" name="subjectInput" type="text" required autoComplete="off" />
                        </div>

                        <div className="formField">
                            <label htmlFor="messageInput">{t('messageInput')}</label>
                            <textarea id="messageInput" name="messageInput" required rows={3} autoComplete="off" minLength={10} />
                        </div>

                        <ActionButton type="submit" label={t('submit')} className="submitButton" />
                        {contactFormAttempted && <p id="contact-form-status" className="formStatus" role="alert">{t('formNotConnected')}</p>}
                    </fieldset>
            </form>
        </div>
    );
}

export default Contact;
