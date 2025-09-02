import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import './FormButtons.css';

const FormButtons = ({ disabled }) => {
  const { t } = useTranslation();


    const handleSubmitClick = (e) => {
        const form = e.currentTarget.closest('form');
        if (!form) return;

        // Show native validation messages and stop if invalid
        if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
            return;
        }

        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            // Fallback for older browsers
            const tmp = document.createElement('button');
            tmp.type = 'submit';
            tmp.style.display = 'none';
            form.appendChild(tmp);
            tmp.click();
            form.removeChild(tmp);
        }
    };

    return (
    <div className="form-buttons">
        <Button type="reset" label={t('form_button_reset')} variant="secondary" disabled={disabled} />
        <div className="small-margin"></div>
        <Button
            type="button"
            label={t('form_button_submit')}
            disabled={disabled}
            onClick={handleSubmitClick}
        />
    </div>
  );

};

FormButtons.propTypes = {
  disabled: PropTypes.bool,
};

export default FormButtons;