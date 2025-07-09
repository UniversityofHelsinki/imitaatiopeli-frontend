import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({
  size = 'medium',
  colour = 'blue',
  ...rest
}) => {

  const dsProps = {
    dsSize: size,
    dsSpinnerColor: colour,
    ...rest
  };

  return <ds-spinner { ...dsProps } />;

};

Spinner.propTypes = {
  size: PropTypes.oneOf([
    '2xLarge',
    'xLarge',
    'large',
    'medium',
    'small',
  ]),
  colour: PropTypes.oneOf([
    'black',
    'blue',
    'white'
  ])
};

export default Spinner;