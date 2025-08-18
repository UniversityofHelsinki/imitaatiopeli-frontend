import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './LocationField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const LocationField = ({ checked, onChange, disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="location-field">
      <CheckBox 
        label={t('game_form_location_field_label')}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={false}
        optional={false}
      />
    </div>
  );

};

LocationField.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default LocationField;