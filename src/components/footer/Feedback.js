import React from 'react';
import PropTypes from 'prop-types';
import './Feedback.css';
import {useTranslation} from "react-i18next";
import MailIcon from "../misc/ds/MailIcon.jsx";

const Feedback = ({ to, label, size = '1.0rem' }) => {
    const {t} = useTranslation();
    return (
            <a href={to} target="_blank" rel="noreferrer noopener" className="feedback-link">
                {label}
                <MailIcon name="mail" size={size} hidden={false} colour="currentColor"  className="feedback-icon" />
                <div className="screenreader-only"> {t('opens_in_email_client')} </div>
            </a>
    );
};

Feedback.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default Feedback;
