import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { get } from '../../../hooks/useHttp';
import JoinGameForm from '../../game/form/JoinGameForm';
import Page from '../Page';
import './JoinGame.css';
import localStorage from '../../../utilities/localStorage';

const JoinGame = () => {
  const { t } = useTranslation();
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState();
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  
  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/public/games/${code}`,
        tag: `GAME_${code}`
      });
      setGame(response.body);
      setAlreadyJoined(JSON.parse(localStorage.get('player'))?.game_id === response.body.game_id);
      setLoading(false);
    })();
  }, []);

  const crumbs = [
    {
      label: t('bread_crumb_home'),
      href: '/'
    },
    {
      label: t('bread_crumb_games'),
      href: '/games'
    },
    {
      label: t('bread_crumb_games_join'),
      href: `/games/${code}/join`,
      current: true
    }
  ];

  return (
    <Page loading={loading} heading={t('join_game_page_heading')} crumbs={crumbs}>
      {alreadyJoined && <span>{t('join_game_player_already_joined')}</span> || <JoinGameForm game={game} />}
    </Page>
  );

};

JoinGame.propTypes = {
};

export default JoinGame;