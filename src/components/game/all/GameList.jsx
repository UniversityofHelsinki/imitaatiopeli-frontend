import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameList.css'
import Game from './Game';
import { get } from '../../../hooks/useHttp';

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