import Loader from '../Loader';
import './ActionButton.css';
import React from 'react';

interface IActionButton extends React.ComponentPropsWithoutRef<"button"> {
    label: string;
    theme?: string;
    loading?: string;
    link?: string;
}

function ActionButton(props: IActionButton) {
    return (
        <button {...props} disabled={!!props.loading || props.disabled} className={(props.loading ? "loading " : "") + (!props.link ? "actionButton " : "actionLink ") + (props.theme ?? 'primary')}>
            <span className="actionButtonLabel">{props.label}</span>
            {props.loading && <Loader></Loader>}
        </button>
    );
}

export default ActionButton;