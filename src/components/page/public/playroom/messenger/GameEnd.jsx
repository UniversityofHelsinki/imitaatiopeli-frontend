import React from 'react';
import PropTypes from 'prop-types';
import './GameEnd.css'
import { useTranslation } from 'react-i18next';

const GameEnd = ({ reason }) => {
  const { t } = useTranslation();

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