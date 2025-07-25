import React from 'react';
import PropTypes from 'prop-types';
import './Game.css'
import Accordion from '../../misc/ds/Accordion';
import Tag from '../../misc/ds/Tag';
import Button from '../../misc/ds/Button';
import Link from '../../misc/ds/Link';

const Header = ({ game }) => {
  return (
    <div className="game-header">
      <span className="game-header-title">{game.configuration.game_name}</span>
      <div className="game-header-state">
        <Tag text="moro" />
      </div>
    </div>
  );

};

const Content = ({ game }) => {
  return (
    <div className="game-content">
      <div className="game-content-data">
        {JSON.stringify(game)}
      </div>
      <div className="game-content-divider"></div>
      <div className="game-content-bottom-row">
        <div className="game-content-actions">
          <Link 
            label="Aloita peli" 
            variant="standalone" 
            icon="play_arrow" 
            size="2xLarge"
            colour="black"
            href={`/admin/game/${game.game_id}/start`}
            internal
          />
          <Link 
            label="Muokkaa peliä" 
            variant="standalone" 
            icon="edit" 
            size="2xLarge"
            colour="black"
            href={`/admin/game/${game.game_id}`}
            internal
          />
        </div>
      </div>
    </div>
  )
};

const Game = ({ game }) => {

  return (
    <div className="game">
      <Accordion 
        header={<Header game={game} />} 
        content={<Content game={game} />} 
        variant="compact"
      />
    </div>
  );

};

Game.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number,
    configuration: PropTypes.shape({
      game_name: PropTypes.string,
      ai_prompt: PropTypes.string,
    })
  })
};

export default Game;