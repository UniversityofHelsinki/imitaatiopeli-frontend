import React from "react";
import PropTypes from "prop-types";
import { DsRadioButton } from "@uh-design-system/component-library-react";


const RadioButton = ({
  id,
  name,
  label = '',
  value,
  legend = '',
  assistiveText,
  required = false,
  disabled = false,
  checked = false,
  errorText = '',
  errorsDisabled = false,
  ...rest
}) => {

  const dsProps = {
    dsId: id,
    dsName: name,
    dsText: label,
    dsValue: value,
    dsLegend: legend,
    dsAssistiveText: assistiveText,
    dsRequired: required,
    dsDisabled: disabled,
    dsChecked: checked,
    dsErrorText: errorText,
    dsErrorsDisabled: errorsDisabled,
    ...rest
  };

  return <DsRadioButton { ...dsProps } />;
};

RadioButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  legend: PropTypes.string,
  assistiveText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  errorText: PropTypes.string,
  errorsDisabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default RadioButton;
