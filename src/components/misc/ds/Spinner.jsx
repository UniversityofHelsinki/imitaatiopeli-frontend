import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({
  size = 'medium',
  colour = 'blue',
  position = 'below',
  text = '',
  ...rest
}) => {

  const dsProps = {
    dsSize: size,
    dsSpinnerColor: colour,
    dsSpinnerTextPosition: position,
    dsText: text,
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
  ]),
  position: PropTypes.oneOf([
    'below',
    'side'
  ]),
  text: PropTypes.string
};

export default Spinner;
