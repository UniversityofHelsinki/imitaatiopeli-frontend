import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './NickNameField.css'
import TextInput from '../../misc/ds/TextInput';
import { useTranslation } from 'react-i18next';

const NickNameField = ({ value, disabled, onChange, validation }) => {
  const { t } = useTranslation();
  const id = useId();

  const errorText = validation && !validation.isValid && validation.message || '';

  return (
    <div className="nickname-field">
      <TextInput
        id={id}
        label={t('nickname_field_label')}
        placeholder={t('nickname_field_placeholder')}
        onInput={event => onChange(event.target.value)}
        disabled={disabled}
        value={value}
        errorText={errorText}
        maxLength={100}
        required
      />
    </div>
  )
};

NickNameField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  validation: PropTypes.object,
};

export default NickNameField;
