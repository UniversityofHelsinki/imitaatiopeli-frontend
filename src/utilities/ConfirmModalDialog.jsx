import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './ConfirmModalDialog.css';
import Button from '../components/misc/ds/Button.jsx';

const ConfirmModalDialog = ({ open, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
    const firstBtnRef = useRef(null);
    const [firstBtn, setFirstBtn] = useState(null);
    
    useEffect(() => {
      if (open && firstBtnRef.current) {
        setFirstBtn(firstBtnRef.current);
      }
    }, [open]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onCancel?.();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onCancel]);

    if (!open) return null;

    const focusFirst = () => {
      firstBtn?.buttonEl?.focus({ focusVisible: true });
    };

    if (firstBtn?.buttonEl) {
      focusFirst();
    }

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
                    <Button ref={firstBtnRef} type="button" size="small" variant="secondary" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    { confirmLabel && <Button type="button" size="small" variant="primary" onClick={onConfirm} onBlur={e => e.preventDefault()} onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); focusFirst(); }}}>
                        {confirmLabel}
                    </Button> }
                </div>
            </div>
        </div>
    );

    // Render as a popup via portal
    return typeof document !== 'undefined'
        ? ReactDOM.createPortal(modal, document.body)
        : modal;
};

export default ConfirmModalDialog;