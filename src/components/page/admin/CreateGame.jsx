import React from 'react';
import PropTypes from 'prop-types';
import './CreateGame.css'
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import CreateGameForm from '../../game/form/CreateGameForm';

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