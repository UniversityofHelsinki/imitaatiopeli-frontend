import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../misc/ds/Button.jsx';
import './Dialog.css';

const Dialog = ({
                    isOpen,
                    onClose,
                    title,
                    children,
                    size = 'medium',
                    showCloseButton = true,
                    showFooter = true,
                    footerActions,
                    className = '',
                    closeOnOverlayClick = true,
                    preventClose = false
                }) => {
    const { t } = useTranslation();

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget && !preventClose) {
            onClose();
        }
    };

    const handleClose = () => {
        if (!preventClose) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className={`dialog dialog--${size} ${className}`}>
                {(title || showCloseButton) && (
                    <div className="dialog__header">
                        {title && <h2 className="dialog__title">{title}</h2>}
                        {showCloseButton && (
                            <button
                                className="dialog__close-btn"
                                onClick={handleClose}
                                disabled={preventClose}
                                aria-label={t('close')}
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}

                <div className="dialog__content">
                    {children}
                </div>

                {showFooter && (
                    <div className="dialog__footer">
                        {footerActions || (
                            <Button
                                type="button"
                                label={t('close')}
                                onClick={handleClose}
                                variant="secondary"
                                disabled={preventClose}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extra-large']),
    showCloseButton: PropTypes.bool,
    showFooter: PropTypes.bool,
    footerActions: PropTypes.node,
    className: PropTypes.string,
    closeOnOverlayClick: PropTypes.bool,
    preventClose: PropTypes.bool
};

export default Dialog;
