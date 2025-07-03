import PropTypes from "prop-types";

const Icon = ({ 
  name, 
  role = 'img',
  title = '', 
  hidden = false, 
  colour = 'ds-palette-black', 
  size = '1.5rem' 
}) => {

  return <ds-icon 
    aria-hidden
    dsName={name} 
    dsRole={role}
    dsTitle={title}
    dsHidden={hidden}
    dsColour={colour}
    dsSize={size}>
  </ds-icon>
};

Icon.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string,
  hidden: PropTypes.bool,
  colour: PropTypes.colour,
  size: PropTypes.string
};

export default Icon;