import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  text = '',
  colour = 'default',
  href = '',
  icon,
  iconPosition = 'start',
  target = '_self',
  ...rest
}) => {
  
  const dsProps = {
    'ds-text': text,
    'ds-colour': colour,
    'ds-href': href,
    'ds-icon': icon,
    'ds-icon-position': iconPosition,
    'ds-target': target,
    ...rest
  };

  return <ds-tag { ...dsProps } />;
};

Tag.propTypes = {
  text: PropTypes.string,
  colour: PropTypes.oneOf([
    'attention',
    'black',
    'danger',
    'default',
    'info',
    'success',
    'white'
  ]),
  href: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf([
    'start',
    'end'
  ]),
  target: PropTypes.oneOf([
    '_blank',
    '_parent',
    '_self',
    '_top',
    '_unfencedTop'
  ])
};

export default Tag;