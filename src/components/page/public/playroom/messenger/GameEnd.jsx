import React from 'react';
import PropTypes from 'prop-types';
import './GameEnd.css'
import { useTranslation } from 'react-i18next';
import {useLocation} from "react-router-dom";

const GameEnd = ({ reason: reasonProp, gameresult: gameresultProp }) => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const reason = reasonProp ?? state?.reason;
    const gameresult = gameresultProp ?? state?.gameresult ?? null;
    return (
        <div className="game-end">
            {reason && <span>{t(reason)}</span>}
            {gameresult && <span>{t(gameresult)}</span>}
        </div>
    );
};

GameEnd.propTypes = {
    reason: PropTypes.string,
    gameresult: PropTypes.string,
};

export default GameEnd;
