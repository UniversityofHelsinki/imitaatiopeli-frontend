import React from 'react';
import PropTypes from 'prop-types';

const Link = ({
  label = '',
  href = '',
  'aria-label': ariaLabel = label,
  colour = 'blue',
  icon,
  iconPosition = 'start',
  weight = 'regular',
  target,
  size = 'medium',
  ...rest
}) => {

  const dsProps = {
    dsText: label,
    dsHref: href,
    dsAriaLabel: ariaLabel,
    dsColour: colour,
    dsIcon: icon,
    dsIconPosition: iconPosition,
    dsWeight: weight,
    dsTarget: target,
    dsSize: size,
    ...rest
  };

  return <ds-link { ...dsProps } />;

};

Link.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  'aria-label': PropTypes.string,
  colour: PropTypes.oneOf([
    'blue',
    'black',
    'white'
  ]),
  size: PropTypes.oneOf([
    '2xLarge',
    'large',
    'medium',
    'small',
    'xLarge',
    'xSmall'
  ]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  weight: PropTypes.oneOf([
    'bold',
    'regular',
    'semibold'
  ]),
  target: PropTypes.oneOf([
    '_blank',
    '_parent',
    '_self',
    '_top',
    '_unfencedTop'
  ])
};

export default Link;