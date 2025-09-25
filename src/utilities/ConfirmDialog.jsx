import React from 'react';
import './ConfirmDialog.css';
import Button from '../components/misc/ds/Button.jsx';

const ConfirmDialog = ({ open, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
    if (!open) return null;

    return (
        <div role="dialog" className="confirm-dialog">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <Button type="button" size="small" variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
                    <Button type="button" size="small" variant="primary" onClick={onConfirm}>{confirmLabel}</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
