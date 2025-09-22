import React from 'react';
import './ResearchField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CheckBox from "../../misc/ds/CheckBox.jsx";

const ResearchField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="research-field">
            <CheckBox
                id="research-field"
                name="research-field"
                value="research"
                legend={t('game_form_research_field_legend')}
                label={t('game_form_research_field_label')}
                checked={value}
                assistiveText={t('game_form_research_field_assistive_text')}
                onChange={handleChange}
                disabled={disabled}
                errorText={errorText}
                required={false}
                optional={false}
            />
        </div>
    );
};

ResearchField.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
};

export default ResearchField;