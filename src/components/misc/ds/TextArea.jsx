import React, { useId, useRef } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../form/FormLabel';
import AssistiveText from '../../form/AssistiveText';
import './TextArea.css';
import ErrorText from './ErrorText';

const TextArea = ({ label, placeholder, assistiveText, value, required, errorText, ...rest }) => {
  const id = useId();
  const assistiveTextId = useId();
  const textAreaRef = useRef(null);

  const onKeyUp = (event) => {
    if (event.key === 'Tab') {
      event.target.select();
    }
  };

  return (
    <div className="ds-text-area">
      <FormLabel elementId={id} required={required}>{label}</FormLabel>
      <AssistiveText id={assistiveTextId}>{assistiveText}</AssistiveText>
      <div className="ds-text-area-margin-block"></div>
      <textarea
        ref={textAreaRef}
        id={id}
        value={value}
        placeholder={placeholder}
        aria-describedby={assistiveTextId}
        onKeyUp={onKeyUp}
        aria-invalid={Boolean(errorText)}
        {...rest}
      />
      {errorText && (
        <ErrorText text={errorText} />
      )}
    </div>
  );

};

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorText: PropTypes.string,
};

export default TextArea;