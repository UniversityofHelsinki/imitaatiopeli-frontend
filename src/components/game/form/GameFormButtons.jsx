import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import './GameFormButtons.css';

const GameFormButtons = ({ disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="game-form-buttons">
        <Button type="reset" label={t('game_form_button_reset')} variant="secondary" disabled={disabled} />
        <div className="small-margin"></div>
        <Button type="submit" label={t('game_form_button_submit')} disabled={disabled} />
    </div>
  );

};

GameFormButtons.propTypes = {
  disabled: PropTypes.bool,
};

export default GameFormButtons;