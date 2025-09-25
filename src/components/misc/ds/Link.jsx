import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../notification/NotificationContext.js';

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
    const { setNotification } = useNotification();

    const onClick = (event) => {
        if (validation && !validation.isValid) {
            event.preventDefault();
            setNotification(validation.message, 'error', true);
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
    ]),
    internal: PropTypes.bool,
    validation: PropTypes.shape({
        isValid: PropTypes.bool,
        message: PropTypes.string
    })
};

export default Link;