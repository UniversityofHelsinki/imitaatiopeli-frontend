import React from 'react';
import PropTypes from 'prop-types';
import './Crumb.css'
import Link from '../ds/Link';
import { useTranslation } from 'react-i18next';

const Crumb = ({ ref, label, href, current }) => {
  const { t } = useTranslation();

  const ariaCurrent = current ? { 'aria-current': 'page' } : {};

  return (
    <div ref={ref} className="crumb">
      <Link variant="standalone" label={t(label)} href={href} { ...ariaCurrent } internal />
    </div>
  );

};

export const propType = {
  ref: PropTypes.any,
  label: PropTypes.string,
  href: PropTypes.string,
  current: PropTypes.bool,
};

Crumb.propTypes = propType;

export default Crumb;