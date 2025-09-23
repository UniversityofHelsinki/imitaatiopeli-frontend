import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ErrorText from './../ds/ErrorText.jsx';

const Link = ({
  label = '',
  href = '',
  'aria-label': ariaLabel = label,
  colour = 'blue',
  icon,
  iconPosition = 'start',
  weight = 'regular',
  target = '_self',
  size = 'medium',
  variant = '',
  internal = false,
  validation,
  ...rest
}) => {
  const navigate = useNavigate();

  const onClick = (event) => {
    if (validation && !validation.isValid) {
      event.preventDefault();
      return;
    }
    if (internal) {
      event.preventDefault();
      navigate(href);
    }
  };

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
    dsVariant: variant,
    ...rest
  };

  return (
      <div className="ds-link-container">
        <ds-link {...dsProps} onClick={onClick} />
        <div className="ds-link-error">
        {validation && !validation.isValid && (
            <ErrorText text={validation.message} />
        )}
        </div>
      </div>
  );
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
  ]),
  variant: PropTypes.oneOf([
    'inline',
    'standalone'
  ])
};

export default Link;
