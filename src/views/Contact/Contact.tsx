import React from 'react';
import { useTranslation } from "react-i18next";
import './Contact.css';

interface ContactFormData {
    name: { value: string };
    email: { value: string };
    subject: { value: string };
    message: { value: string };
}

function Contact() {

    const handleSubmitClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & ContactFormData;
        console.log(target.name.value);
        console.log(target.email.value);
        console.log(target.subject.value);
        console.log(target.message.value);
    };

    const { t } = useTranslation(['contactUs']);
    return (
        <div>
            <h1>{t('contactUs')}</h1>
            <form onSubmit={handleSubmitClick}>
                <fieldset>
                    {/* <legend>{t('contactUs')}</legend> */}
                    <div className="formField">
                        <label htmlFor="nameInput">{t('nameInput')}</label>
                        <input id="nameInput" name="nameInput" type="text" required autoComplete="on" />
                    </div>
                    
                    <div className="formField">
                        <label htmlFor="emailInput">{t('emailInput')}</label>
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

                    <input type="submit" value="Submit" className="actionButton primary submitButton" />
                </fieldset>
            </form>
        </div>
    );
}

export default Contact;