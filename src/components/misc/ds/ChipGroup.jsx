import React from 'react';
import PropTypes from 'prop-types';

const ChipGroup = ({
  children,
  assistiveText,
  label,
  ...rest
}) => {

  const dsProps = {
    dsAssistiveText: assistiveText,
    dsLabel: label,
    ...rest,
  };

  return <ds-chip-group { ...dsProps }>
    {children}
  </ds-chip-group>;
};

ChipGroup.propTypes = {
  children: PropTypes.node,
  assistiveText: PropTypes.string,
  label: PropTypes.string,
};

export default ChipGroup;
