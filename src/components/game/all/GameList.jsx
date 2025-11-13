import PropTypes from 'prop-types';
import React from 'react';
import Game from './Game';
import './GameList.css';

const GameList = ({ games = [], reload }) => {

  return (
    <div className="game-list-container">
      <ul className="game-list">
        {games.toSorted((a, b) => b.game_id - a.game_id).map(game => (
          <Game key={game.game_id} game={game} reload={reload} />
        ))}
      </ul>
    </div>
  )
  
};

GameList.propTypes = {
  games: PropTypes.array
};

export default GameList;
