import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Dialog from "../../dialog/Dialog.jsx";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const QRDialog = ({ isOpen, onClose, game }) => {
    const [qrSrc, setQrSrc] = useState("");
    const { t } = useTranslation();

    const joinUrl = `${window.location.origin}/games/${game.game_code}/join`;

    useEffect(() => {
        if (isOpen && joinUrl) {
            QRCode.toDataURL(joinUrl).then(setQrSrc);
        }
    }, [isOpen, joinUrl]);

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={t('qr_code_dialog_title')}
            size="large"
            showFooter={false}
            className="qr-dialog"
        >
            <div style={styles.wrapper}>
                {qrSrc && <img src={qrSrc} alt="QR Code" style={styles.qr} />}
            </div>
        </Dialog>
    );
}

const styles = {
    wrapper: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    qr: {
        width: "60vmin",
        height: "60vmin",
        objectFit: "contain",
    },
};

QRDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
};

export default QRDialog;
