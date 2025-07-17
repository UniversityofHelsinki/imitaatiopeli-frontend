import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './ResearchPermissionField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ResearchPermissionField = ({ checked, onChange, disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="research-permission-field">
      <CheckBox 
        legend={t('game_form_research_permission_field_legend')}
        label={t('game_form_research_permission_field_label')}
        checked={checked}
        assistiveText={t('game_form_research_permission_field_assistive_text')}
        onChange={onChange}
        disabled={disabled}
        required={false}
      />
    </div>
  );

};

ResearchPermissionField.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ResearchPermissionField;