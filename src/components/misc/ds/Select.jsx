import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Option = ({
  children,
  value,
  disabled = false,
  ...rest
}) => {

  const dsProps = {
    dsValue: value,
    dsDisabled: disabled,
    ...rest
  };

  return <ds-option { ...dsProps}>{children}</ds-option>

};

Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

const Select = ({
  children,
  title = '',
  placeholder = '',
  variant = 'default',
  clearable = true,
  disabled = false,
  errorText,
  icon,
  id,
  invalid = false,
  loading = false,
  loadingText,
  optionsError = false,
  optionsErrorText,
  optionsErrorTitle,
  value,
  onChange,
  ...rest
}) => {

  const ref = useRef();

  useEffect(() => {
    if (ref.current && onChange) {
      ref.current.addEventListener('dsChange', onChange);
    }
  }, [ref.current, onChange]);

  const dsProps = {
    dsTitle: title,
    dsPlaceholder: placeholder,
    dsVariant: variant,
    dsClearable: clearable,
    dsDisabled: disabled,
    dsErrorText: errorText,
    dsIcon: icon,
    dsId: id,
    dsInvalid: invalid,
    dsLoading: loading,
    dsLoadingText: loadingText,
    dsOptionsError: optionsError,
    dsOptionsErrorText: optionsErrorText,
    dsOptionsErrorTitle: optionsErrorTitle,
    dsValue: value,
    ...rest
  };

  return <ds-select ref={ref} { ...dsProps }>
    {children}
  </ds-select>
};

Select.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf([
    'native',
    'default',
  ]),
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  optionsError: PropTypes.bool,
  optionsErrorText: PropTypes.string,
  optionsErrorTitle: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
