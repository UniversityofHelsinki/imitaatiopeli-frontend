import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../misc/ds/Accordion';
import Link from '../../misc/ds/Link';
import Tag from '../../misc/ds/Tag';
import './Game.css';

const Header = ({ game }) => {
  const { t } = useTranslation();

  const startTag = (
    <Tag text={t('game_tag_started')} colour="success" />
  );

  const endTag = (
    <Tag text={t('game_tag_ended')} colour="danger" />
  );

  const tag = (() => {
    if (game.start_time && game.end_time) {
      return endTag;
    } else if (game.start_time) {
      return startTag;
    }
    return <></>;
  })();

  return (
    <div className="game-header">
      <span className="game-header-title">{game.configuration.game_name}</span>
      <div className="game-header-state">
        {tag}
      </div>
    </div>
  );

};

const Content = ({ game }) => {


  const stateLink = (() => {
    const gameNotStarted = !game.start_time && !game.end_time;
    const gameStarted = game.start_time && !game.end_time;
    if (gameNotStarted) {
      return (
        <Link
          label="Aloita peli"
          variant="standalone"
          icon="play_arrow"
          size="2xLarge"
          colour="black"
          href={`/admin/games/${game.game_id}/start`}
          internal
        />
      );
    } else if (gameStarted) {
      return (
        <Link
          label="Lopeta peli"
          variant="standalone"
          icon="pause"
          size="2xLarge"
          colour="black"
          href={`/admin/games/${game.game_id}/end`}
          internal
        />
      );
    }
  })();

  return (
    <div className="game-content">
      <div className="game-content-data">
        {JSON.stringify(game)}
      </div>
      <div className="game-content-divider"></div>
      <div className="game-content-bottom-row">
        <div className="game-content-actions">
          {stateLink}
          <Link
            label="Muokkaa peliä"
            variant="standalone"
            icon="edit"
            size="2xLarge"
            colour="black"
            href={`/admin/games/${game.game_id}`}
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