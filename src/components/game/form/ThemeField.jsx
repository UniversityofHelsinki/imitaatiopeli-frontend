import React, {useId, useState} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../misc/ds/TextInput';
import { useTranslation } from 'react-i18next';

const ThemeField = ({ value, onChange, disabled, validation }) => {
  const { t } = useTranslation();
  const id = useId();
  const [touched, setTouched] = useState(false);

  const errorText = touched && validation && !validation.isValid && t(validation.message) || '';
  
  return (
    <div className="theme-field">
      <TextInput 
        id={id}
        label={t('game_form_theme_field_label')}
        value={value}
        onInput={onChange}
        onBlur={() => setTouched(true)}
        placeholder={t('game_form_theme_field_placeholder')}
        assistiveText={t('game_form_theme_field_assistive_text')}
        disabled={disabled}
        errorText={errorText ? errorText  : undefined}
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