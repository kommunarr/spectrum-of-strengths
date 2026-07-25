import { useTranslation } from "react-i18next";

function Events() {
    const { t } = useTranslation(['common']);
    // const partnerEvents = {}
    return (
        <div className="events">
            <h1>{t('events')}</h1>
            <h2>Official Events</h2>
            <ul>
                <li>
                    <p>Seniors&apos; Sunday Spectrum Soiree</p>
                    <p>Closed group, reach out to the SSF team privately for date & time information</p>
                </li>
            </ul>
            <h2>Partner Events</h2>
            <ul>
                <li>
                    <a target="_blank" rel="noreferrer" href="https://www.meetup.com/aspergers-autism-asd-relatives-socializing-networking/">Asperger&apos;s, Autism, ASD Socializing</a>
                    <p>Open to all, Thursdays at 6 PM</p>
                </li>
            </ul>
        </div>
    );
}

export default Events;
