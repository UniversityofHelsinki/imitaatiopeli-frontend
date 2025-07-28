import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameListing.css'
import GameList from '../../game/all/GameList';
import { get } from '../../../hooks/useHttp';
import Page from '../Page';
import { useTranslation } from 'react-i18next';

const GameListing = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      const response = await get({
        path: '/api/games',
        tag: 'GAMES' 
      });
      setGames(response.body);
      setLoading(false);
    })();
  }, []);

  const crumbs = [
    {
      label: 'bread_crumb_home',
      href: '/'
    },
    {
      label: 'bread_crumb_admin',
      href: '/admin/'
    },
    {
      label: 'bread_crumb_admin_games',
      href: '/admin/games',
      current: true
    }
  ];

  return (
    <Page 
      heading={t('game_listing_page_heading')}
      loading={loading}
      crumbs={crumbs}
    >
      <GameList games={games} />
    </Page>
  );

};

GameListing.propTypes = {
};

export default GameListing;