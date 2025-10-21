import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FinalReviewForm.css'
import { useTranslation } from 'react-i18next';
import RadioButtonGroup from '../../../../misc/ds/RadioButtonGroup';
import RadioButton from '../../../../misc/ds/RadioButton';
import TextArea from '../../../../misc/ds/TextArea';
import Button from '../../../../misc/ds/Button';
import { ConfidenceMeter } from './RatingForm';

const FinalReviewForm = ({ 
  onSubmit 
}) => {

  const [value, setValue] = useState({
    selection: null,
    confidence: 2,
    justification: ''
  });

  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleChange = (property, v) => {
    setValue({
      ...value,
      [property]: v
    });
  };

  return (
    <form className="final-review-form" onSubmit={handleSubmit}>
      <div className="final-review-form-heading">
        <h4>{t('final_review_form_heading')}</h4>
      </div>
      <div className="final-review-form-options">
        <RadioButtonGroup 
          label={t('final_review_form_options_legend')}
          assistiveText={t('final_review_form_options_assistive_text')}
          value={value.selection}
        >
          <RadioButton 
            name="final_review_form_options"
            value={0}
            label={t('final_review_form_options_label_1')} 
            onChange={() => handleChange('selection', 0)}
            checked={value.selection === 0}
          />
          <RadioButton 
            name="final_review_form_options" 
            value={1}
            label={t('final_review_form_options_label_2')}
            onChange={() => handleChange('selection', 1)}
            checked={value.selection === 1}
          />
        </RadioButtonGroup>
      </div>
      <div className="final-review-form-confidence rating-form-confidence">
        <ConfidenceMeter value={value.confidence} onChange={c => handleChange('confidence', parseInt(c))} />
      </div>
      <div className="final-review-form-justification">
        <TextArea value={value.justification} onChange={e => handleChange('justification', e.target.value)} label={t('final_review_form_justification_label')} />
      </div>
      <div className="final-review-form-actions">
        <Button type="submit" label={t('final_review_form_actions_submit')} />
      </div>
    </form>
  );

};

FinalReviewForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default FinalReviewForm;