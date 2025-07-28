import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './BreadCrumb.css'
import Icon from '../ds/Icon';
import Crumb from './Crumb';
import { useTranslation } from 'react-i18next';

const move = (() => {
  let lastTouch = null;
  return (event) => {
    const currentX = event.touches[0].clientX;
    if (!lastTouch) {
      lastTouch = event.touches[0];
      return;
    }
    const difference = currentX - lastTouch.clientX;
    const breadCrumbContainer = event.currentTarget;
    if (difference > 0) {
      breadCrumbContainer.scrollBy({ left: -30, behavior: 'instant' });
    } else if (difference < 0) {
      breadCrumbContainer.scrollBy({ left: 30, behavior: 'instant' });
    }
    lastTouch = event.touches[0];
  };
})();

const Separator = () => (
  <div aria-hidden className="bread-crumb-separator">
    <Icon name="chevron_forward" colour="ds-palette-black-40" />
  </div>
);


const BreadCrumb = ({ crumbs }) => {
  const { t } = useTranslation();

  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView(false);
    }
  }, [lastRef.current]);


  useEffect(() => {
    if (firstRef.current && lastRef.current && containerRef.current) {
      const firstLeft = Math.abs(firstRef.current.getBoundingClientRect().left);
      const lastRight = Math.abs(lastRef.current.getBoundingClientRect().right);
      const minWidth = firstLeft + lastRight;
      const mediaQuery = window.matchMedia(`(min-width: ${minWidth + 32}px)`);

      const toggleButtons = (matches) => {
        const btns = containerRef.current?.querySelectorAll('.bread-crumb-scroll-button');
        if (matches && btns) {
          btns.forEach(btn => btn.classList.add('hidden'));
        } else if (btns) {
          btns.forEach(btn => btn.classList.remove('hidden'));
          lastRef.current.scrollIntoView(false);
        }
      };

      mediaQuery.addEventListener("change", (e) => {
        toggleButtons(e.matches);
      });

      toggleButtons(mediaQuery.matches);
    }
  }, [firstRef.current, lastRef.current, containerRef.current]);

  const scroll = (event, direction) => {
    switch (direction) {
      case 'left':
        navRef.current.scrollBy({ left: -50 });
        break;
      case 'right':
        navRef.current.scrollBy({ left: 50 });
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="bread-crumbs-container">
      <div className="bread-crumb-scroll-button bread-crumb-scroll-button-left">
        <button onClick={e => scroll(e, 'left')}>
          <span className="screenreader-only">{t('bread_crumb_scroll_left')}</span>
          <Icon name="chevron_backward" />
        </button>
      </div>
      <nav ref={navRef} className="bread-crumbs" onTouchMove={move}>
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
      <div className="bread-crumb-scroll-button bread-crumb-scroll-button-right">
        <button onClick={e => scroll(e, 'right')}>
          <span className="screenreader-only">{t('bread_crumb_scroll_right')}</span>
          <Icon name="chevron_forward" />
        </button>
      </div>
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