import React, { useEffect, useState } from 'react';
import Page from '../Page';
import './EndOfGameByAdmin.css';
import {Route, useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EndOfGameByAdmin = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <Page  heading={t('game_end_reason_by_admin')} >
            <p>EndOfGameByAdmin.js ja EndOfGameByAdmin.css pitää poistaa. (ja ohjaus App.jsx sivulla)</p>
            <p>Oikea sivu tehdään tiketissä IM-181.</p>
            <p>App.jsx pitää lisätä tuo IM-181 tehty sivu, jolle siirrytään.</p>
        </Page>
    );
};

EndOfGameByAdmin.propTypes = {
};

export default EndOfGameByAdmin;