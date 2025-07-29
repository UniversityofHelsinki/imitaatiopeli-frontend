import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Icon from '../ds/Icon';
import './BreadCrumb.css';
import Crumb from './Crumb';

const Separator = () => (
  <div aria-hidden className="bread-crumb-separator">
    <Icon name="chevron_forward" colour="ds-palette-black-40" />
  </div>
);

const BreadCrumb = ({ crumbs }) => {
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView(false);
    }
  }, [lastRef.current]);

  return (
    <div ref={containerRef} className="bread-crumbs-container">
      <nav ref={navRef} className="bread-crumbs">
        {crumbs.map((crumb, i) => {
          let refProp = {};
          if (i === 0) {
            refProp = { ref: firstRef };
          } else if (i + 1 === crumbs.length) {
            refProp = { ref: lastRef };
          }
          const addSeparator = i > 0;
          return <React.Fragment key={crumb.href}>
            {addSeparator && <Separator />}
            <Crumb {...refProp} {...crumb} />
          </React.Fragment>;
        })}
      </nav>
    </div>
  );
};

BreadCrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  }))
};

export default BreadCrumb;