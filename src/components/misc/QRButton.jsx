import React from "react";
import QRIcon from "./QRIcon.jsx";
import "./QRButton.css";
import {useTranslation} from "react-i18next";

export default function QRButton({ onClick, size = 24 }) {
    const { t } = useTranslation();
    const sizeClass = `qr-button--${size}`;
    return (
        <button type="button"
                aria-haspopup="dialog"
                className={`qr-button ${sizeClass}`}
                onClick={onClick}
                title={t('qr_code_button_title')}
                aria-label={t('qr_code_button_title')}
        >
            <QRIcon size={size} color="currentColor" className="qr-icon" />
        </button>
    );
}
