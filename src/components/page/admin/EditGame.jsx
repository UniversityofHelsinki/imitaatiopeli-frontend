import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditGame.css'
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import EditGameForm from '../../game/form/EditGameForm';
import { useParams } from 'react-router-dom';
import { get } from '../../../hooks/useHttp';
import useEditGame from '../../../hooks/useEditGame';

const EditGame = () => {
  const { t } = useTranslation();
  const { id: gameId } = useParams();
  const save = useEditGame(gameId);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await get({ 
        path: `/api/game/${gameId}`, 
        tag: `GAME_${gameId}` 
      });
      setGame({ ...response.body });
      setLoading(false);
    })();
  }, []);

  const saveGame = async (game) => {
    const saved = await save(game);
    setGame(saved);
    return saved;
  };

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
      href: '/admin/games/'
    },
    {
      label: 'bread_crumb_admin_games_edit',
      href: `/admin/games/${gameId}`
    }
  ]

  return <Page 
    loading={loading}
    heading={t('edit_game_form_heading')}
    crumbs={crumbs}>
      <EditGameForm 
        game={game} 
        saveGame={saveGame}
      />
  </Page>
};

EditGame.propTypes = {
};

export default EditGame;