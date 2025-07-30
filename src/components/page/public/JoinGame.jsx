import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './JoinGame.css'
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import JoinGameForm from '../../game/form/JoinGameForm';
import { get } from '../../../hooks/useHttp';

const JoinGame = () => {
  const { t } = useTranslation();
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState();
  
  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/public/games/${code}`,
        tag: `GAME_${code}`
      });
      setGame(response.body);
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
      <JoinGameForm game={game} />
    </Page>
  );

};

JoinGame.propTypes = {
};

export default JoinGame;