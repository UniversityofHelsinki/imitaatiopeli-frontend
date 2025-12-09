import React from 'react';
import './ResearchField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CheckBox from "../../misc/ds/CheckBox.jsx";
import './RandomizationField.css';

const ShowResultField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="show-result-field">
            <CheckBox
                id="show-result-field"
                name="show-result-field"
                value="show-result"
                legend={t('game_form_show_result_field_legend')}
                label={t('game_form_show_result_field_legend')}
                checked={value}
                assistiveText={t('game_form_show_result_field_assistive_text')}
                onChange={handleChange}
                disabled={disabled}
                errorText={errorText}
                required={false}
                optional={false}
            />
        </div>
    );
};

ShowResultField.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
};

export default ShowResultField;
