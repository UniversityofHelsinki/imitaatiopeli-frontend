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

  return (
    <Page 
      heading={t('game_listing_page_heading')}
      loading={loading}
    >
      <GameList games={games} />
    </Page>
  )

};

GameListing.propTypes = {
};

export default GameListing;