import React from 'react';
import PropTypes from 'prop-types';

const LinkWithArrow = ({
  text = '',
  href,
  'aria-label': ariaLabel = text,
  iconPosition = 'start',
  target = '_self',
  ...rest
}) => {

  const dsProps = {
    dsText: text,
    dsHref: href,
    dsAriaLabel: ariaLabel,
    dsIconPosition: iconPosition,
    dsTarget: target,
    ...rest
  };

  return <ds-link-with-arrow { ...dsProps } />;

};

LinkWithArrow.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  'aria-label': PropTypes.string,
  iconPosition: PropTypes.string,
  target: PropTypes.oneOf([
    '_blank',
    '_parent',
    '_self',
    '_top',
    '_unfencedTop'
  ])
};

export default LinkWithArrow;