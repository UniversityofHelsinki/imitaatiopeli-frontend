import React, {useId, useState} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_OPTIONS } from '../../../Constants';
import './LanguageField.css';
import ErrorText from "../../misc/ds/ErrorText.jsx";

const LanguageField = ({ value, onChange, disabled, validation, languages = LANGUAGE_OPTIONS }) => {
    const { t } = useTranslation();
    const id = useId();
    const [touched, setTouched] = useState(false);

    const errorText = (touched && validation && !validation.isValid && t(validation.message)) || '';
    const name = `language-${id}`;

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.value } });
    };

    return (
        <div className="name-field language-field">
            <fieldset
                className="language-radio-group"
                aria-describedby={`${id}-assistive ${id}-error`}
                aria-invalid={Boolean(errorText) || undefined}
            >
                <legend className="language-legend">{t('game_form_language_field_label')}</legend>

                <div id={`${id}-assistive`} className="language-assistive-text">
                    {t('game_form_language_field_assistive_text')}
                </div>

                <div className="language-radio-options">
                    {languages.map((opt, index) => {
                        const radioId = `${id}-${opt.value}`;
                        return (
                            <div className="language-radio-option" key={opt.value}>
                                <input
                                    id={radioId}
                                    type="radio"
                                    name={name}
                                    value={opt.value}
                                    checked={value === opt.value}
                                    onChange={handleChange}
                                    onBlur={() => setTouched(true)}
                                    disabled={disabled}
                                    required={index === 0}
                                />
                                <label className="language-radio-label" htmlFor={radioId}>
                                    {t(opt.label)}
                                </label>
                            </div>
                        );
                    })}
                </div>
                {errorText ? <ErrorText text={errorText}/> : undefined }
            </fieldset>
        </div>
    );
};

LanguageField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
    languages: PropTypes.array,
};

export default LanguageField;