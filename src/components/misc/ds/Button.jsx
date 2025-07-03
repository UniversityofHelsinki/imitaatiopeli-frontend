import PropTypes from "prop-types";

const Button = ({
  label = '',
  disabled = false,
  size = 'medium',
  variant = 'primary',
  colour = 'blue',
  type = 'button',
  icon = '',
  iconPosition = 'start',
  isLoading = false,
  spinnerOnly = false,
  spinnerHiddenText = '',
  hiddenAssistiveText = '',
  fullWidth = false,
  ...rest
}) => {

  const dsProps = {
    dsValue: label,
    dsAriaLabel: label,
    dsDisabled: disabled,
    dsSize: size,
    dsVariant: variant,
    dsColour: colour,
    dsType: type,
    dsIcon: icon,
    dsIconPosition: iconPosition,
    dsIsLoading: isLoading,
    dsUseSpinner: spinnerOnly,
    dsSpinnerHiddenText: spinnerHiddenText,
    dsHiddenAssistiveText: hiddenAssistiveText,
    dsFullWidth: fullWidth,
    ...rest
  };

  return (
    <ds-button { ...dsProps } />
  );
};

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    'medium',
    'small'
  ]),
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'supplementary'
  ]),
  colour: PropTypes.oneOf([
    'blue',
    'black',
    'white'
  ]),
  type: PropTypes.oneOf([
    'button',
    'reset',
    'submit'
  ]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  isLoading: PropTypes.bool,
  spinnerOnly: PropTypes.bool,
  spinnerHiddenText: PropTypes.string,
  hiddenAssistiveText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;