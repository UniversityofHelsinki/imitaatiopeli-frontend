import React from 'react';
import PropTypes from 'prop-types';
import './MessageField.css';
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';

const MessageField = ({
                          onSubmit,
                          onChange,
                          disabled = false,
                          announcement = <></>,
                          message,
                          msglength = null,
                          hidden = false,
                      }) => {
    const { t } = useTranslation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(message);
        }
    };

    const handleChange = (event) => {
        const message = msglength ? event.target.value?.substring(0, msglength) : event.target.value;
        onChange(message);
    };

    const onEnterDown = (event) => {
        if (event.code === "Enter" && !event.shiftKey) {
            event.preventDefault();
        }
    };

    return (
        !hidden && <div className="messenger-message-field">
            {disabled && announcement &&
                <div className="messenger-message-field-announcement" aria-live="assertive">{announcement}</div>
            }
            <form onSubmit={handleSubmit}>
                <textarea aria-label={t('message_field_message')} disabled={disabled} value={message} rows={3} cols={1} onChange={handleChange} onKeyDown={onEnterDown} placeholder={t('enter_message_placeholder')} />
                <div className="messenger-message-field-bottom-row">
                    {msglength && (
                        <span className="messenger-message-field-character-count">
                            {message.length} / {msglength}
                        </span>
                    )}
                    <Button
                        disabled={message?.trim().length === 0 || disabled}
                        type="submit"
                        icon="send-fill"
                        variant="supplementary"
                        aria-label={t('messenger_message_form_submit_button')}
                    />
                </div>
            </form>
        </div>
    );

};

MessageField.propTypes = {
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    announcement: PropTypes.node,
    msglength: PropTypes.number,
    message: PropTypes.string,
    hidden: PropTypes.bool,
};

export default MessageField;
