import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';

const PromptField = ({ value, onChange, disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="prompt-field">
      <TextArea
        placeholder={t('game_form_prompt_field_placeholder')}
        label={t('game_form_prompt_field_label')}
        value={value}
        assistiveText={t('game_form_prompt_field_assistive_text')}
        onChange={onChange}
        disabled={disabled}
        required
      />
    </div>
  )
};

PromptField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PromptField;