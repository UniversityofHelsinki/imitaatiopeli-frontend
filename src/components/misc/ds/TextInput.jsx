import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

const TextInput = ({
  label,
  placeholder,
  name,
  disabled = false,
  required = false,
  readOnly = false,
  value,
  min,
  max,
  assistiveText,
  prefixText,
  suffixText,
  errorText,
  icon,
  type = 'text',
  autocomplete,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  actionButtonAriaLabel,
  hiddenAssistiveText,
  id,
  maxLength,
  optional,
  optionalText,
  pattern,
  ...rest
}) => {
  
  const dsProps = {
    dsLabel: label,
    dsPlaceholder: placeholder,
    dsName: name,
    dsDisabled: disabled,
    dsRequired: required,
    dsReadOnly: readOnly,
    dsValue: value,
    dsMin: min,
    dsMax: max,
    dsAssistiveText: assistiveText,
    dsPrefixText: prefixText,
    dsSuffixText: suffixText,
    dsErrorText: errorText,
    dsIcon: icon,
    dsType: type,
    dsAutocomplete: autocomplete,
    dsAriaLabel: ariaLabel,
    dsAriaLabelledBy: ariaLabelledBy,
    dsAriaDescribedBy: ariaDescribedBy,
    dsActionButtonAriaLabel: actionButtonAriaLabel,
    dsHiddenAssistiveText: hiddenAssistiveText,
    dsId: id,
    dsMaxLength: maxLength,
    dsOptional: optional,
    dsOptionalText: optionalText,
    dsPattern: pattern,
    ...rest
  };
  
  return <ds-text-input { ...dsProps }></ds-text-input>;
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  assistiveText: PropTypes.string,
  prefixText: PropTypes.string,
  suffixText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.oneOf([
    'email',
    'loading',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url'
  ]),
  autocomplete: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  actionButtonAriaLabel: PropTypes.string,
  hiddenAssistiveText: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  optional: PropTypes.bool,
  optionalText: PropTypes.string,
  pattern: PropTypes.string
};

export default TextInput;