import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CheckBoxGroup from "../../misc/ds/CheckBoxGroup.jsx";
import CheckBox from "../../misc/ds/CheckBox.jsx";
import { LANGUAGE_OPTIONS } from '../../../Constants';

const LanguageField = ({ value, onChange, disabled, validation, languages = LANGUAGE_OPTIONS }) => {
    const { t } = useTranslation();
    const id = useId();

    // Emit an event-like object where target.value is the next field value
    const handleToggle = (val) => (eOrChecked) => {
        const checked =
            typeof eOrChecked === 'boolean'
                ? eOrChecked
                : eOrChecked?.target?.checked;

        const nextValue = checked ? val : '';
        onChange?.({ target: { value: nextValue } });
    };

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    return (
        <div className="name-field">
            <CheckBoxGroup
                legend={t('game_form_language_field_label')}
                assistiveText={t('game_form_language_field_assistive_text')}
                errorText={errorText}
                direction='horizontal'
                allRequired={true}
            >
                {languages.map((opt) => (
                    <CheckBox
                        key={opt.value}
                        name="language"
                        value={opt.value}
                        label={t(opt.label)}
                        checked={value === opt.value}
                        onChange={handleToggle(opt.value)}
                        disabled={disabled}
                        errorsDisabled={true}
                        optional={false}
                        required={false}
                    />
                ))}
            </CheckBoxGroup>

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