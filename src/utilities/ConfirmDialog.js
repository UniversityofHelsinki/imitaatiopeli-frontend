import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
    if (!open) return null;

    return (
        <div role="dialog" aria-modal="true" className="confirm-dialog">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <button type="button" onClick={onCancel}>{cancelLabel}</button>
                    <button type="button" onClick={onConfirm}>{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
