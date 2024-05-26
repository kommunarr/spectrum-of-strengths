import { MouseEventHandler } from 'react';
import './ActionButton.css';

interface IActionButton {
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
}

function ActionButton(props: IActionButton) {
    return (
        <button className="actionButton" onClick={props.onClick}>{props.label}</button>
    );
}

export default ActionButton;