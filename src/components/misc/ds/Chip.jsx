import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Chip = ({
  index = 0,
  text = '',
  icon,
  ...rest
}) => {
  const ref = useRef();

  const dsProps = {
    dsIndex: index,
    dsText: text,
    dsIcon: icon,
    ...rest
  };

  return <ds-chip ref={ref} { ...dsProps } />;

};

Chip.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.string
};

export default Chip;