import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameListing.css'
import GameList from '../../game/all/GameList';
import { get } from '../../../hooks/useHttp';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import Link from '../../misc/ds/Link';
import CheckBox from '../../misc/ds/CheckBox';

const GameListing = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnded, setShowEnded] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await get({
        path: '/api/games',
        tag: 'GAMES' 
      });
      setGames(response.body);
      setLoading(false);
    })();
  }, [reload]);

  const reloadGames = () => {
      setReload(!reload);
  }

  const handleShowEndedChecked = (event) => {
    setShowEnded(event.target.checked);
  };

  const filteredGames = games?.filter(game =>
      showEnded ? Boolean(game.end_time) : !game.end_time
  );


  const crumbs = [
    {
      label: 'bread_crumb_admin_games',
      href: '/admin/games',
      current: true
    }
  ];

  const createGameLink = (
    <Link 
      label={t('game_listing_page_create_game')} 
      href="/admin/games/create"
      icon="list_alt_add"
      colour="black"
      variant="standalone"
      size="2xLarge"
      internal 
    />
  );

  const showEndedGames = (
    <CheckBox
      name="showEndedGames"
      id="show-ended-games-checkbox"
      checked={showEnded}
      onChange={handleShowEndedChecked}
      label={t('game_listing_page_show_ended_games')}
      optional={false}
    />
  );

  const headingExtras = (
      <div className="heading-extras-container">
        <span className="ended-games">
          {showEndedGames}
        </span>
        <span className="create-game-link">
          {createGameLink}
        </span>
      </div>
  );


  return (
    <Page 
      heading={t('game_listing_page_heading')}
      headingExtras={headingExtras}
      loading={loading}
      crumbs={crumbs}
    >
      <GameList games={filteredGames} reload={reloadGames} />
    </Page>
  );

};

GameListing.propTypes = {
};

export default GameListing;