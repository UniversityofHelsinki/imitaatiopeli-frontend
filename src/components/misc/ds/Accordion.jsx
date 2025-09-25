import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Accordion.css';

import { DsAccordion } from '@uh-design-system/component-library-react';


const Accordion = ({
  header = '',
  content = '',
  variant = 'default',
  headingLevel = 2,
  id,
  openByDefault = false,
  hideTopBorder = false,
  hideBottomBorder = false,
  showCloseButton = false,
  alignBorders = false,
  closeButtonLabel,
  ...rest
}) => {
  const { t } = useTranslation();
  const defaultId = useId();

  const dsProps = {
    Items: 1,
    dsVariant: variant,
    dsUseCloseButton: showCloseButton,
    dsBorderAligned: alignBorders,
    dsOpenByDefault: openByDefault,
    dsHeadingLevel: headingLevel,
    dsAccordionId: id || defaultId,
    dsHideTopBorder: hideTopBorder,
    dsHideBottomBorder: hideBottomBorder,
    dsCloseButtonLabel: closeButtonLabel || t('accordion_close'),
    ...rest
  };

  return (<DsAccordion {...dsProps}>
    <span
      role="heading"
      aria-level={headingLevel}
      className="accordion-header"
      slot="header">
      {header}
    </span>
    <div slot="content">{content}</div>
  </DsAccordion>);
};

Accordion.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
  variant: PropTypes.oneOf([
    'compact',
    'default'
  ]),
  headingLevel: PropTypes.number,
  id: PropTypes.string,
  openByDefault: PropTypes.bool,
  alignBorders: PropTypes.bool,
  hideTopBorder: PropTypes.bool,
  hideBottomBorder: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  closeButtonLabel: PropTypes.string,
};

export default Accordion;
