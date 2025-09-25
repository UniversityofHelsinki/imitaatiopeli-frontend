import React from 'react';
import PropTypes from 'prop-types';
import { DsChipGroup } from '@uh-design-system/component-library-react';


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

  return <DsChipGroup { ...dsProps }>
    {children}
  </DsChipGroup>;
};

ChipGroup.propTypes = {
  children: PropTypes.node,
  assistiveText: PropTypes.string,
  label: PropTypes.string,
};

export default ChipGroup;
