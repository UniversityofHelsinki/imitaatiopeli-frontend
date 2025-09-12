import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './ResearchPermissionForm.css'
import CheckBox from '../../misc/ds/CheckBox';
import { useTranslation } from 'react-i18next';
import BottomRow from './BottomRow';
import FormButtons from './FormButtons';

const ResearchPermissionForm = ({ onSubmit, saving, configuration }) => {
  const id = useId();
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const onChange = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };

  const onReset = (event) => {
    event.preventDefault();
    setChecked(false);
  };

  const errorText = checked ? null : t('research_permission_form_acceptance_is_required');

  return (
    <div className="research-permission-form-container">
      <p>
        {configuration.research_description}
      </p>
      <form className="research-permission-form" onReset={onReset} onSubmit={onSubmit}>
        <CheckBox
          id={id}
          name="research-permission-acceptance"
          label={t('research_permission_form_acceptance_label')}
          errorText={errorText}
          checked={checked}
          value="research-permission-acceptance"
          onChange={onChange}
          required
        />
        <div className="research-permission-form-bottom-row">
          <BottomRow saving={saving}>
            <FormButtons disabled={saving} />
          </BottomRow>
        </div>
      </form>
    </div>
  );

};

ResearchPermissionForm.propTypes = {
  configuration: PropTypes.object,
  onSubmit: PropTypes.func,
  saving: PropTypes.bool,
};

export default ResearchPermissionForm;