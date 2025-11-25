import React from "react";
import QRIcon from "./QRIcon.jsx";
import "./QRButton.css";
import {useTranslation} from "react-i18next";

export default function QRButton({ onClick }) {
    const { t } = useTranslation();
    return (
        <button type="button" aria-haspopup="dialog" className="qr-button" onClick={onClick} title={t('qr_code_button_title')} aria-label={t('qr_code_button_title')}>
            <QRIcon size={24} color="currentColor" className="qr-icon" />
        </button>
    );
}
