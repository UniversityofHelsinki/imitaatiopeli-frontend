import PropTypes, {string} from "prop-types";
import React from "react";

import { DsIconHelpFill } from "@uh-design-system/component-library-react";

const IconHelpFill = ({
              colour = 'var(--ds-palette-blue-70)',
              role = 'img',
              size = '1.5rem',
              title = '?',
              ...rest
    }) => {

    const dsProps = {
        dsColour: colour,
        dsRole: role,
        dsSize: size,
        dsTitle: title,
        ...rest
    };

    return (
        <DsIconHelpFill { ...dsProps } />
    );
};

IconHelpFill.propTypes = {
    title: PropTypes.string,
    size: PropTypes.oneOf([
        'medium',
        'small'
    ]),
    colour: PropTypes.oneOf([
        'blue',
        'black',
        'white'
    ]),
    role: PropTypes.string,
};

export default IconHelpFill;
