import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DsTagGroup } from '@uh-design-system/component-library-react';


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

  return <DsTagGroup { ...dsProps }>
    {children}
  </DsTagGroup>;
};

TagGroup.propTypes = {
  children: PropTypes.node,
  assistiveText: PropTypes.string,
  label: PropTypes.string,
};

export default TagGroup;
