import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CustomFields.css'
import TextInput from '../../misc/ds/TextInput';
import { useTranslation } from 'react-i18next';

const CustomFields = ({ value, disabled, onChange, validation }) => {
    const { t } = useTranslation();
    const id = useId();

    const errorText = validation && !validation.isValid && validation.message || '';

    const addCustomField = (event) => {
        event.preventDefault();
        /*
            add custom field
         */
    };

    return (
        <div className="custom-fields">
            <button
                className="custom-fields-add-button"
                onClick={(event) => addCustomField(event)}
            >
                {t('custom-fields-add_field')}
            </button>
        </div>
    )
};

CustomFields.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.object,
};

export default CustomFields;