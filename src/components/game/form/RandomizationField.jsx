import React from 'react';
import './ResearchField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CheckBox from "../../misc/ds/CheckBox.jsx";

const RandomizationField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="randomization-field">
            <CheckBox
                id="randomization-field"
                name="randomization-field"
                value="randomization"
                legend={t('game_form_randomization_field_legend')}
                label={t('game_form_randomization_field_legend')}
                checked={value}
                assistiveText={t('game_form_randomization_field_assistive_text')}
                onChange={handleChange}
                disabled={disabled}
                errorText={errorText}
                required={false}
                optional={false}
            />
        </div>
    );
};

RandomizationField.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
};

export default RandomizationField;
