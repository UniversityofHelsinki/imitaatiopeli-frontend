import React from 'react';
import PropTypes from 'prop-types';
import './Page.css'
import { useTranslation } from 'react-i18next';
import LoadingPage from '../misc/LoadingPage';
import BreadCrumb from '../misc/breadcrumb/BreadCrumb';
import { propType as CrumbPropType } from '../misc/breadcrumb/Crumb';

const Page = ({
  children,
  heading,
  headingExtras = <></>,
  crumbs = [],
  loading = false
}) => {
  const { t } = useTranslation();

  if (loading) {
    return <LoadingPage>
      <span>{t('loading_page')}</span>
    </LoadingPage>
  }

  return (
    <div className="page">
      <div className="page-navigation">
        {crumbs.length > 0 && 
          <>
            <BreadCrumb crumbs={crumbs} />
            <div className="navigation-divider"></div>
          </>
        }
      </div>
      <div className="page-heading">
        <h2>{heading}</h2>
        <div className="page-heading-extras">
          {headingExtras}
        </div>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );

};

Page.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  headingExtras: PropTypes.node,
  crumbs: PropTypes.arrayOf(PropTypes.shape(CrumbPropType)),
  loading: PropTypes.bool,
};

export default Page;