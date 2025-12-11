import React, { useEffect, useState } from 'react';
import EndGameForm from '../../game/form/EndGameForm';
import Page from '../Page';
import './EndGame.css';
import useEndGame from '../../../hooks/useEndGame';
import { useNotification } from '../../notification/NotificationContext.jsx';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import Link from "../../misc/ds/Link.jsx";


const EndGame = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setNotification } = useNotification();
  const end = useEndGame(id);

  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/api/game/${id}`,
        tag: `GAME_${id}`
      });
      setGame({ ...response.body });
      setLoading(false);
    })();
  }, [game]);

  const endGame = async () => {
    await end();
    setNotification(t('end_game_page_success_notification'), 'success', true);
  };

  const isAlreadyEnded = game?.end_time;

  const crumbs = [
    {
      label: 'bread_crumb_admin_games',
      href: '/admin/games/'
    },
    {
      label: 'bread_crumb_admin_games_end',
      href: `/admin/games/${id}/end`,
      current: true
    }
  ];

  return (
    <Page loading={loading} heading={isAlreadyEnded ? t('end_game_page_already_ended') :  t('end_game_page_heading')} crumbs={crumbs}>
      {!isAlreadyEnded && <EndGameForm game={game} endGame={endGame} />}
        {isAlreadyEnded &&
            <div>
              <Link
                  label={t('end_game_move_to_gamelist')}
                  variant="standalone"
                  icon="home"
                  size="2xLarge"
                  colour="black"
                  href={`/admin/games`}
                  internal
              />
            </div>
        }
    </Page>
  );
};

EndGame.propTypes = {
};

export default EndGame;
