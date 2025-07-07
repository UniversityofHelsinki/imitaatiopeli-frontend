import React from 'react';
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
    dsText: text,
    dsColour: colour,
    dsHref: href,
    dsIcon: icon,
    dsIconPosition: iconPosition,
    dsTarget: target,
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