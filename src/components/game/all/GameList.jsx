import PropTypes from 'prop-types';
import React from 'react';
import Game from './Game';
import './GameList.css';

const GameList = ({ games = [] }) => {

  return (
    <div className="game-list-container">
      <ul className="game-list">
        {games.map(game => (
          <Game key={game.game_id} game={game} />
        ))}
      </ul>
    </div>
  )
  
};

GameList.propTypes = {
  games: PropTypes.array
};

export default GameList;