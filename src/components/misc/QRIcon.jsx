import React from "react";
import PropTypes from "prop-types";

const QRIcon = ({ size = 24, color = "currentColor", onClick }) => {
    return (
        <svg
            onClick={onClick}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
            style={{
                cursor: onClick ? "pointer" : "default",
                display: "inline-block",
                verticalAlign: "middle",
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm10-2h6v6h-6V3zm2 2v2h2V5h-2zm-10 10h4v4h-4v-4zm2 2v0h0v0h0v0zm0-8h2v2h-2v-2zm8 6h2v2h-2v-2zm-4 0h2v2h-2v-2zm0-4h2v2h-2v-2z"/>
        </svg>
    );
};

QRIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func,
};

export default QRIcon;
