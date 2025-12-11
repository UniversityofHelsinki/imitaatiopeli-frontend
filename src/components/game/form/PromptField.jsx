import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';
import './PromptField.css'

const PromptField = ({ value, onChange, disabled, validation }) => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);

  const errorText = touched && validation && !validation.isValid && t(validation.message) || '';

  return (
    <div className="prompt-field">
      <TextArea
        placeholder={t('game_form_prompt_field_placeholder')}
        label={t('game_form_prompt_field_label')}
        value={value}
        assistiveText={t('game_form_prompt_field_assistive_text')}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        disabled={disabled}
        errorText={errorText ? errorText  : undefined}
        required
      />
    </div>
  )
};

PromptField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  validation: PropTypes.object,
};

export default PromptField;