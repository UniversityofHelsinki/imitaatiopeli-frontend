import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MessageField.css'
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';

const MessageField = ({ 
  onSubmit,
  onChange,
  disabled = false,
  announcement = <></>,
  message,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(message);
    }
  };

  const handleChange = (event) => {
    const message = event.target.value;
    onChange(message);
  };

  const onEnterDown = (event) => {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="messenger-message-field">
      {disabled && announcement && 
        <div className="messenger-message-field-announcement" aria-live="assertive">{announcement}</div>
      }
      <form onSubmit={handleSubmit}>
        <textarea aria-label={t('message_field_message')} disabled={disabled} value={message} rows={2} onChange={handleChange} onKeyDown={onEnterDown} />
        <Button disabled={disabled} type="submit" icon="send-fill" label={t('messenger_message_form_submit_button')} />
      </form>
    </div>
  );

};

MessageField.propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  announcement: PropTypes.node,
};

export default MessageField;