import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './Contact.css';
import ActionButton from '../../components/ActionButton';

interface ContactFormData {
    name: { value: string };
    email: { value: string };
    subject: { value: string };
    message: { value: string };
}

function Contact() {
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

    const handleSubmitClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setTimeout(() => { setContactFormSubmitted(true); }, 500);
        // const target = e.target as typeof e.target & ContactFormData;
        // console.log(target.name.value);
        // console.log(target.email.value);
        // console.log(target.subject.value);
        // console.log(target.message.value);
    };

    const { t } = useTranslation(['contactUs', 'common']);
    return (
        <div>
            <h1>{t('contactUs')}</h1>
            {
                !contactFormSubmitted ?
                    <form onSubmit={handleSubmitClick}>
                    <fieldset>
                        {/* <legend>{t('contactUs')}</legend> */}
                        <div className="formField">
                            <label htmlFor="nameInput">{t('nameInput')}</label>
                            <input id="nameInput" name="nameInput" type="text" required autoComplete="on" />
                        </div>
                        
                        <div className="formField">
                            <label htmlFor="emailInput">{t('emailAddress', { ns: 'common'} )}</label>
                            <input id="emailInput" name="emailInput" type="email" required autoComplete="on" />
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
                    </fieldset>
                </form>
                :
                <div className="postSubmitMessage">
                    <h2 className="postSubmitMessageTitle">{t('postSubmitTitle')}</h2>
                    <h3>{t('postSubmitSubtitle')}</h3>
                </div>
            }
        </div>
    );
}

export default Contact;