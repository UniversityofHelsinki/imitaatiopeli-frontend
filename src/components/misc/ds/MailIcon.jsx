import React from 'react';
import PropTypes from 'prop-types';
import {DsIconMail} from '@uh-design-system/component-library-react';

const MailIcon = ({
                  name = 'mail',
                  size = '1.5rem',
                  ariaLabel = 'Icon',
                  role = 'img',
                  hidden = false,
                  colour = 'ds-palette-red',
                  title = '',
                  ...rest
              }) => {
    return (
        <DsIconMail
            dsName={name}
            dsSize={size}
            dsAriaLabel={ariaLabel}
            dsRole={role}
            dsHidden={hidden}
            dsColour={colour}
            dsTitle={title}
            {...rest}
        />
    );
};

MailIcon.propTypes = {
    name: PropTypes.string,
    size: PropTypes.string,
    ariaLabel: PropTypes.string,
    role: PropTypes.string,
    hidden: PropTypes.bool,
    colour: PropTypes.string,
    title: PropTypes.string,
};

export default MailIcon;
