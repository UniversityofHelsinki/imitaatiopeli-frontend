import React, { useId } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../misc/ds/TextInput';
import { useTranslation } from 'react-i18next';

const ThemeField = ({ value, onChange, disabled, validation }) => {
  const { t } = useTranslation();
  const id = useId();

  const errorText = validation && !validation.isValid && validation.message || '';
  
  return (
    <div className="theme-field">
      <TextInput 
        id={id}
        label={t('game_form_theme_field_label')}
        value={value}
        onInput={onChange}
        placeholder={t('game_form_theme_field_placeholder')}
        assistiveText={t('game_form_theme_field_assistive_text')}
        disabled={disabled}
        errorText={errorText}
        required
      />
    </div>
  );
};

ThemeField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  validation: PropTypes.object,
};

export default ThemeField;