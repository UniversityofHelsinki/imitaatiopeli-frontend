import React, { useEffect, useState } from 'react';
import Page from '../Page';
import './EndOfGame.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EndOfGame = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <Page  heading={t('end_of_game_page_heading')} >
        </Page>
    );
};

EndOfGame.propTypes = {
};

export default EndOfGame;