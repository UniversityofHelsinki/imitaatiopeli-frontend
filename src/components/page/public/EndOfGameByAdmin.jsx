import React, { useEffect, useState } from 'react';
import Page from '../Page';
import './EndOfGameByAdmin.css';
import {Route, useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EndOfGameByAdmin = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <Page  heading={t('end_of_game_by_admin_heading')} >
            EndOfGameByAdmin.js ja EndOfGameByAdmin.css voi poistaa.
            Oikean sivu tehdään tiketissä IM-197.
            App.jsx pitää riville {` <Route path=":id/endbyadmin" element={<EndOfGameByAdmin />} /> `} pitää muuttaa tuo
            IM-197 tehty sivu.
        </Page>
    );
};

EndOfGameByAdmin.propTypes = {
};

export default EndOfGameByAdmin;