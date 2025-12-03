import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FinalReviewForm.css';
import { useTranslation } from 'react-i18next';
import RadioButtonGroup from '../../../../misc/ds/RadioButtonGroup';
import RadioButton from '../../../../misc/ds/RadioButton';
import TextArea from '../../../../misc/ds/TextArea';
import Button from '../../../../misc/ds/Button';
import { ConfidenceMeter } from './RatingForm';

const FinalReviewForm = ({
                             onSubmit,
                             answerOptions = []
                         }) => {

    const [value, setValue] = useState({
        selection: null,
        confidence: null,
        justification: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { t } = useTranslation();

    // Check if form is valid (radio button selected and justification provided)
    const isFormValid = value.selection !== null && value.justification.trim() !== '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (onSubmit && !isSubmitting && isFormValid && !isSubmitted) {
            setIsSubmitting(true);
            try {
                await onSubmit(value);
                setIsSubmitted(true);
            } catch (error) {
                // If submission fails, re-enable the button
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (property, v) => {
        if (property === 'selection') {
            const selectedOption = answerOptions.find(opt => String(opt.answerId) === v);
            console.log('Selected answer ID:', v);
            console.log('Is pretender?', selectedOption?.isPretender);
            console.log('Selected option:', selectedOption);
        }

        setValue({
            ...value,
            [property]: v
        });
    };

    const getButtonLabel = () => {
        if (isSubmitted) {
            return t('final_review_form_actions_submitted');
        }
        if (isSubmitting) {
            return t('final_review_form_actions_submitting');
        }
        return t('final_review_form_actions_submit');
    };

    return (
        <form className="final-review-form" onSubmit={handleSubmit}>
            <div className="final-review-form-container">
                <div className="final-review-form-heading">
                    <h4>{t('final_review_form_heading')}</h4>
                </div>
                <div className="final-review-form-options">
                    <RadioButtonGroup
                        label={t('final_review_form_options_legend')}
                        assistiveText={t('final_review_form_options_assistive_text')}
                        value={value.selection}
                        dsDirection='horizontal'
                    >
                        {answerOptions.map((option) => (
                            <RadioButton
                                key={option.answerId}
                                id={`final_review_option_${option.answerId}`}
                                name="final_review_form_options"
                                value={String(option.answerId)}
                                label={t(`final_review_form_options_label_${option.index + 1}`)}
                                onClick={(e) => e.preventDefault() || handleChange('selection', String(option.answerId))}
                                checked={value.selection === String(option.answerId)}
                                disabled={isSubmitting || isSubmitted}
                            />
                        ))}
                    </RadioButtonGroup>
                </div>
            </div>
            <div className="final-review-form-confidence rating-form-confidence">
                <ConfidenceMeter
                    value={value.confidence}
                    onChange={c => handleChange('confidence', parseInt(c))}
                    disabled={isSubmitting || isSubmitted}
                />
            </div>
            <div className="final-review-form-justification">
                <TextArea
                    value={value.justification}
                    onChange={e => handleChange('justification', e.target.value?.substring(0, 500))}
                    label={t('final_review_form_justification_label')}
                    disabled={isSubmitting || isSubmitted}
                />
                <span className="rating-form-justifications-character-count">
                    {value.justification.length} / 500
                </span>
            </div>
            <div className="final-review-form-actions">
                <Button
                    type="submit"
                    label={getButtonLabel()}
                    disabled={!isFormValid || isSubmitting || isSubmitted}
                />
            </div>
        </form>
    );
};

FinalReviewForm.propTypes = {
    onSubmit: PropTypes.func,
    answerOptions: PropTypes.array,
};

export default FinalReviewForm;
