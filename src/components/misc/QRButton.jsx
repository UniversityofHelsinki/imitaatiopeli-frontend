import React from "react";
import QRIcon from "./QRIcon.jsx";
import "./QRButton.css";

export default function QRButton({ onClick }) {
    return (
        <button type="button" className="qr-button" onClick={onClick}>
            <QRIcon size={24} color="currentColor" className="qr-icon" />
        </button>
    );
}
