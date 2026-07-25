import Loader from '../Loader';
import './ActionButton.css';
import type { ComponentPropsWithoutRef } from 'react';

interface IActionButton extends ComponentPropsWithoutRef<'button'> {
    label: string;
    theme?: string;
    loading?: boolean;
    link?: boolean;
}

function ActionButton(props: IActionButton) {
    const {
        label,
        theme = 'primary',
        loading = false,
        link = false,
        className,
        disabled,
        ...buttonProps
    } = props;

    const buttonClassName = [
        loading ? 'loading' : '',
        link ? 'actionLink' : 'actionButton',
        theme,
        className ?? '',
    ].filter(Boolean).join(' ');

    return (
        <button
            {...buttonProps}
            type={buttonProps.type ?? 'button'}
            disabled={loading || disabled}
            aria-busy={loading}
            className={buttonClassName}
        >
            <span className='actionButtonLabel'>{label}</span>
            {loading && <Loader />}
        </button>
    );
}

export default ActionButton;
