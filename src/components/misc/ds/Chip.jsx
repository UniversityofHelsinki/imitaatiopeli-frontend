import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DsChip } from '@uh-design-system/component-library-react';

const Chip = ({
  index = 0,
  text = '',
  icon,
  onClick,
  ...rest
}) => {
  const ref = useRef();

  
  useEffect(() => {
    if (ref.current && onClick) {
      ref.current.addEventListener('dsClick', onClick);
    }
  }, [ref.current, onClick]);
  

  const dsProps = {
    index,
    'ds-text': text,
    'ds-icon': icon,
    ...rest
  };

  return <DsChip ref={ref} { ...dsProps } />;

};

Chip.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Chip;