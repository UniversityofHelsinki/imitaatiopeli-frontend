import React, { useEffect, useState } from 'react';
import Page from '../Page';
import './EndOfGame.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EndOfGame = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const crumbs = [
        {
            label: 'bread_crumb_home',
            href: '/'
        },
        {
            label: 'bread_crumb_games',
            href: '/games'
        },
        {
            label: 'bread_crumb_games_lobby',
            href: `/games/${id}/end`,
            current: true
        }
    ];

    return (
        <Page  heading={t('end_of_game_page_heading')} crumbs={crumbs}>
        </Page>
    );
};

EndOfGame.propTypes = {
};

export default EndOfGame;