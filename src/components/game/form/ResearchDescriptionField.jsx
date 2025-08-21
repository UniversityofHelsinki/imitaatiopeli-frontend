import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';
import './InstructionsField.css';

const ResearchDescriptionField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    return (
        <div className="research-description-field">
                <TextArea
                    placeholder={t('game_form_research_description_placeholder')}
                    label={t('game_form_research_description_label')}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    errorText={errorText}
                    required
                />
        </div>
    );
};

ResearchDescriptionField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
};

export default ResearchDescriptionField;
