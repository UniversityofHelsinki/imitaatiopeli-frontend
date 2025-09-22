import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  label = '',
  checked = false,
  indeterminate = false,
  disabled = false,
  errorText,
  required = false,
  optional = !required,
  legend = '',
  assistiveText = '',
  optionalText = '',
  errorsDisabled = false,
  id,
  name,
  value,
  ...rest
}) => {

  const dsProps = {
    dsText: label,
    dsChecked: checked,
    dsIndeterminate: indeterminate,
    dsDisabled: disabled,
    dsErrorText: errorText,
    dsRequired: required,
    dsOptional: optional,
    dsLegend: legend,
    dsAssistiveText: assistiveText,
    dsOptionalText: optionalText,
    dsErrorsDisabled: errorsDisabled,
    dsId: id,
    dsName: name,
    dsValue: value,
    ...rest
  };

  return <ds-checkbox { ...dsProps } />;
};

CheckBox.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  legend: PropTypes.string,
  assistiveText: PropTypes.string,
  optionalText: PropTypes.string,
  'aria-label': PropTypes.string,
  errorsDisabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CheckBox;
