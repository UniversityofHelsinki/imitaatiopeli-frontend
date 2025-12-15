import PropTypes from 'prop-types';
import React from 'react';
import Game from './Game';
import './GameList.css';
import {useTranslation} from "react-i18next";

const GameList = ({ games = [], reload }) => {
    const { t } = useTranslation();

  return (
    <div className="game-list-container">
      { games && games.length > 0 ? (
      <ul className="game-list">
        {games.toSorted((a, b) => b.game_id - a.game_id).map(game => (
          <Game key={game.game_id} game={game} reload={reload} />
        ))}
      </ul>
      ) : (
        <div className="no-games">
            <div className="horizontal-divider" />
            {t('game_list_no_games')}
        </div>
      )}
    </div>
  )
  
};

GameList.propTypes = {
  games: PropTypes.array
};

export default GameList;
