import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateGameForm from '../../game/form/CreateGameForm';
import Page from '../Page';
import './CreateGame.css';

const CreateGame = () => {
  const { t } = useTranslation();

  const crumbs = [
    {
      label: 'bread_crumb_home',
      href: '/'
    },
    {
      label: 'bread_crumb_admin',
      href: '/admin'
    },
    {
      label: 'bread_crumb_admin_games',
      href: '/admin/games'
    },
    {
      label: 'bread_crumb_admin_games_create',
      href: '/admin/games/create',
      current: true
    }
  ];

  return (
    <Page 
      heading={t('create_game_form_heading')}
      crumbs={crumbs}> 
      <CreateGameForm />
    </Page>
  );
};

CreateGame.propTypes = {
};

export default CreateGame;