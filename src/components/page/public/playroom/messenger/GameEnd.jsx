import React from 'react';
import PropTypes from 'prop-types';
import './GameEnd.css'
import { useTranslation } from 'react-i18next';
import {useLocation} from "react-router-dom";

const GameEnd = ({ reason: reasonProp }) => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const reason = reasonProp ?? state?.reason;

    return (
        <div className="game-end">
            <span>{t(reason)}</span>
        </div>
    );
};

GameEnd.propTypes = {
    reason: PropTypes.string,
};

export default GameEnd;
