import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useLanguageModels from '../../../hooks/useLanguageModels.js';
import Select, { Option } from '../../../components/misc/ds/Select.jsx';

const LanguageModelField = ({ value, onChange, disabled, validation}) => {
    const { t } = useTranslation();
    const { models, loading, error } = useLanguageModels();
    const [touched, setTouched] = useState(false);

    // Normalize to strings for Select/Option matching
    const selectValue = value == null ? '' : String(value);

    // Optional: find selected label (can be used for debugging or if your Select supports a prop for it)
    const selectedModel = models.find(m => String(m.model_id) === selectValue);
    const selectedLabel = selectedModel?.name ?? '';

    const handleChange = (e) => {
        const model = e?.detail;
        onChange?.(parseInt(model));
    };

    const errorText = touched && validation && !validation.isValid && t(validation.message) || '';

    return (
        <div className="form-field">
            <Select
                id="language-model-select"
                title={t('language_model')}
                placeholder={selectedLabel ? selectedLabel : t('select_language_model')}
                value={selectValue}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                disabled={disabled}
                loading={loading}
                loadingText={t('loading_models')}
                optionsError={!!error}
                optionsErrorText={error ? `${t('failed_to_load_models')}: ${error}` : undefined}
                invalid={validation && !validation.isValid}
                errorText={errorText ? errorText  : undefined}
                clearable={true}
            >
                {models.map((model) => (
                    <Option key={model.model_id} value={String(model.model_id)}>
                        {model.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

LanguageModelField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    validation: PropTypes.object, // Match other field components
};

export default LanguageModelField;
