import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateGameForm from '../../game/form/CreateGameForm';
import Page from '../Page';
import './CreateGame.css';

const CreateGame = () => {
  const { t } = useTranslation();

  return (
    <Page 
      heading={t('create_game_form_heading')}> 
      <CreateGameForm />
    </Page>
  );
};

CreateGame.propTypes = {
};

export default CreateGame;