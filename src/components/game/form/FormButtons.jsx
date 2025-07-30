import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import './FormButtons.css';

const FormButtons = ({ disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="form-buttons">
        <Button type="reset" label={t('form_button_reset')} variant="secondary" disabled={disabled} />
        <div className="small-margin"></div>
        <Button type="submit" label={t('form_button_submit')} disabled={disabled} />
    </div>
  );

};

FormButtons.propTypes = {
  disabled: PropTypes.bool,
};

export default FormButtons;