import PropTypes from "prop-types";
import '@uh-design-system/component-library/dist/component-library/ds-icon.entry';

const Icon = ({ 
  name, 
  role = 'img',
  title = '', 
  hidden = false, 
  colour = 'ds-palette-black', 
  size = '1.5rem',
  ...rest
}) => {

  return <ds-icon 
    aria-hidden
    dsName={name} 
    dsRole={role}
    dsTitle={title}
    dsHidden={hidden}
    dsColour={colour}
    dsSize={size} 
    { ...rest }
  />
};

Icon.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string,
  hidden: PropTypes.bool,
  colour: PropTypes.string,
  size: PropTypes.string
};

export default Icon;