import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TagGroup = ({
  children,
  assistiveText,
  label,
  ...rest
}) => {

  const dsProps = {
    dsAssistiveText: assistiveText,
    dsLabel: label,
    ...rest
  };
  
  return <ds-tag-group { ...dsProps }>
    {children}
  </ds-tag-group>;
};

TagGroup.propTypes = {
  children: PropTypes.node,
  assistiveText: PropTypes.string,
  label: PropTypes.string,
};

export default TagGroup;