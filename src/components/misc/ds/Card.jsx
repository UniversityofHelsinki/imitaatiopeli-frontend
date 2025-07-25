import React from 'react';
import PropTypes from 'prop-types';
import { DsCard } from '@uh-design-system/component-library-react';

const Card = ({
  heading,
  description,
  eyebrow,
  headingLevel = 3,
  imageUrl,
  imageAlt,
  showArrow = false,
  subtitle,
  url,
  urlTarget = '_self',
  variant = 'filled',
  children,
  footer,
  ...rest
}) => {
  
  const dsProps = {
    dsHeading: heading,
    dsDescription: description,
    dsEyebrow: eyebrow,
    dsHeadingLevel: headingLevel,
    dsImageUrl: imageUrl,
    dsImageAlt: imageAlt,
    dsShowArrow: showArrow,
    dsSubtitle: subtitle,
    dsUrl: url,
    dsUrlTarget: urlTarget,
    dsVariant: variant,
    ...rest
  };
  
  return <DsCard { ...dsProps }>
    <div slot="content">{children}</div>
    <div slot="footer">{footer}</div>
  </DsCard>;
};

Card.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  headingLevel: PropTypes.number,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  showArrow: PropTypes.bool,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  urlTarget: PropTypes.oneOf([
    '_blank',
    '_parent',
    '_self',
    '_top',
    '_unfencedTop'
  ]),
  variant: PropTypes.oneOf([
    'filled',
    'outlined'
  ]),
  children: PropTypes.node,
  footer: PropTypes.node,
};

export default Card;