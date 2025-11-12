import React, { useEffect, useState } from 'react';
import Page from '../Page';
import './EndOfGameByAdmin.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EndOfGameByAdmin = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <Page  heading={t('end_of_game_by_admin_heading')} >
        </Page>
    );
};

EndOfGameByAdmin.propTypes = {
};

export default EndOfGameByAdmin;