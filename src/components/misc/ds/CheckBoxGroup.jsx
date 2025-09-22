import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxGroup = ({
  children,
  legend = '',
  assistiveText = '',
  direction = 'vertical',
  errorText = '',
  text = '',
  checked = false,
  disabled = false,
  allRequired = false,
  optional = false,
  optionalText = '',
  ...rest
}) => {

  const dsProps = {
    dsLegend: legend,
    dsAssistiveText: assistiveText,
    dsDirection: direction,
    dsErrorText: errorText,
    dsText: text,
    dsChecked: checked,
    dsDisabled: disabled,
    dsAllRequired: allRequired,
    dsOptional: optional,
    dsOptionalText: optionalText,
    ...rest
  };

  return <ds-checkbox-group { ...dsProps }>{children}</ds-checkbox-group>
};

CheckBoxGroup.propTypes = {
  legend: PropTypes.string,
  assistiveText: PropTypes.string,
  direction: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
  errorText: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  allRequired: PropTypes.bool,
  optional: PropTypes.bool,
  optionalText: PropTypes.string,
};

export default CheckBoxGroup;
