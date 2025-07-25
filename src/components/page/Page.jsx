import React from 'react';
import PropTypes from 'prop-types';
import './Page.css'
import { useTranslation } from 'react-i18next';
import LoadingPage from '../misc/LoadingPage';

const Page = ({
  children,
  heading,
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
      <div className="page-heading">
        <h2>{heading}</h2>
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
  loading: PropTypes.bool,
};

export default Page;