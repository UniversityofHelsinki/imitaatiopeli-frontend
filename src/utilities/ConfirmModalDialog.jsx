import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ConfirmModalDialog.css';
import Button from '../components/misc/ds/Button.jsx';

const ConfirmModalDialog = ({ open, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
    if (!open) return null;

    const modal = (
        <div
            className="confirm-dialog-backdrop"
            role="presentation"
            onClick={onCancel}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="confirm-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <Button type="button" size="small" variant="secondary" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    { confirmLabel && <Button type="button" size="small" variant="primary" onClick={onConfirm}>
                        {confirmLabel}
                    </Button> }
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onCancel?.();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onCancel]);

    // Render as a popup via portal
    return typeof document !== 'undefined'
        ? ReactDOM.createPortal(modal, document.body)
        : modal;
};

export default ConfirmModalDialog;