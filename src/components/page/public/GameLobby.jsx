import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameLobby.css'
import { useParams } from 'react-router-dom';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import localStorage from '../../../utilities/localStorage';

const GameLobby = () => {
  const { code } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setJoined] = useState(false);
  const [playerConfiguration, setPlayerConfiguration] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/public/games/${code}`,
        tag: `GAME_${code}`
      });
      setGame({ ...response.body });
      setLoading(false);

      const player = JSON.parse(localStorage.get("player"));
      const hasJoined = player?.game_id === response.body.game_id;
      setPlayerConfiguration(response.body.configuration[0]);

    })();
  }, []);

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
      href: `/games/${code}`,
      current: true
    }
  ]

  return (
      <Page loading={loading} heading={t('game_lobby_heading')} crumbs={crumbs}>
        {hasJoined && <span>???</span> || <span>{t('game_lobby_player_not_joined')}</span>}
        <br/>
        <br/>
        <div className="game-lobby-page-instructions">
          {playerConfiguration?.instructions_for_players}
        </div>

      </Page>
  )

};

GameLobby.propTypes = {
};

export default GameLobby;