import { MouseEventHandler } from 'react';
import './ActionButton.css';

interface IActionButton {
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
    theme?: string;
}

function ActionButton(props: IActionButton) {
    return (
        <button className={"actionButton " + (props.theme ?? 'primary')} onClick={props.onClick}>{props.label}</button>
    );
}

export default ActionButton;