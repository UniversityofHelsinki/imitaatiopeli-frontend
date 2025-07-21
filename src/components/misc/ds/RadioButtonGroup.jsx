import React from "react";
import PropTypes from "prop-types";
import { DsRadioButtonGroup } from "@uh-design-system/component-library-react";

const RadioButtonGroup = ({
  children,
  legend = '',
  assistiveText = '',
  direction = 'vertical',
  errorText,
  value,
  required = false,
  ...rest
}) => {
  const dsProps = {
    dsLegend: legend,
    dsAssistiveText: assistiveText,
    dsDirection: direction,
    dsErrorText: errorText,
    dsValue: value,
    dsRequired: required,
    ...rest
  };
  
  return <DsRadioButtonGroup { ...dsProps }>{children}</DsRadioButtonGroup>
};

RadioButtonGroup.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
  assistiveText: PropTypes.string,
  direction: PropTypes.oneOf([
    'horizontal',
    'vertical'
  ]),
  errorText: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default RadioButtonGroup;