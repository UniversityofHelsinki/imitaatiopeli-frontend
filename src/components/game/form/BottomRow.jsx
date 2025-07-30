import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../../misc/ds/Spinner';
import './BottomRow.css';

export const BottomRow = ({ children, saving }) => {
  const { t } = useTranslation();

  const content = (() => {
    if (saving) {
      return <Spinner
        position="side"
        size="large"
        text={t('bottom_row_saving')} />;
    }
    return <></>;
  })();

  return <div className="form-bottom-row">
    <div className="bottom-row-state-text">{content}</div>
    {children}
  </div>;
};

BottomRow.propTypes = {
  children: PropTypes.node,
  saving: PropTypes.bool,
};

export default BottomRow;