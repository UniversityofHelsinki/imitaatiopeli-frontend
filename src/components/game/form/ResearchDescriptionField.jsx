import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';
import './InstructionsField.css';
import './ResearchDescriptionField.css'

const ResearchDescriptionField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();
    const [touched, setTouched] = useState(false);

    const errorText = touched && validation && !validation.isValid && t(validation.message) || '';

    return (
        <div className="research-description-field">
                <TextArea
                    placeholder={t('game_form_research_description_placeholder')}
                    label={t('game_form_research_description_label')}
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    assistiveText={t('game_form_research_description_assistive_text')}
                    disabled={disabled}
                    errorText={errorText ? errorText  : undefined}
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
