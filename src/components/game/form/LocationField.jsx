import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './LocationField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const LocationField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
    <div className="location-field">
      <CheckBox
          id="location-field"
          name="location-field"
          label={t('game_form_location_field_label')}
          checked={value}
          onChange={handleChange}
          disabled={disabled}
          errorText={errorText}
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