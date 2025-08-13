import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../misc/ds/Accordion';
import Link from '../../misc/ds/Link';
import Tag from '../../misc/ds/Tag';
import './Game.css';
import Icon from "../../misc/ds/Icon.jsx";
import useDeleteGame from '../../../hooks/useDeleteGame.js';
import {useNotification} from "../../notification/NotificationContext.js";

const Header = ({ game }) => {
  const { t } = useTranslation();

  const waitingTag = (
      <Tag text={t('game_tag_waiting')} colour="info" />
  );

  const startTag = (
    <Tag text={t('game_tag_started')} colour="success" />
  );

  const endTag = (
    <Tag text={t('game_tag_ended')} colour="black" />
  );

  const tag = (() => {
    if (game.start_time && game.end_time) {
      return endTag;
    } else if (game.start_time) {
      return startTag;
    }
    return waitingTag;
  })();

  return (
    <div className="game-header">
      <span className="game-header-title">{game.configuration.theme_description}</span>
      <div className="game-header-state">
        {tag}
      </div>
    </div>
  );

};

const Content = ({ game }) => {
  const { t } = useTranslation();
  const { setNotification } = useNotification();

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    setNotification(t('game_tag_copy_notification'), 'success', true);
  }

  //Poistoa varten on tehtävä "popUp", jossa kysytään halutaanko peli varmasti poistaa.
  //Kys. sivulle välitetään url:iin game_id. Sivulla pystytään lukemaan  useParams() metodilla game_id
  //ja välittämään useDeleteGame:lle
  const [ remove ]= useDeleteGame();

  const removeGame = async (...game) => {
    await remove(game);
  }

  const stateLink = (() => {
    const gameNotStarted = !game.start_time && !game.end_time;
    const gameStarted = game.start_time && !game.end_time;
    if (gameNotStarted) {
      return (
        <Link
          label={t('game_tag_start_game')}
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
            label={t('game_tag_end_game')}
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

  const  minutesToHMin = (totalMinutes, { dropZeroHours = true, hLabel = 'h', mLabel = 'min' } = {}) => {
    const sign = totalMinutes < 0 ? '-' : '';
    const abs = Math.abs(totalMinutes);
    const h = Math.floor(abs / 60);
    const m = abs % 60;

    const parts = [];
    if (!(dropZeroHours && h === 0)) parts.push(`${h} ${hLabel}`);
    parts.push(`${m} ${mLabel}`);

    return sign + parts.join(' ');
  }

  const truncate = (text, max = 80) =>
      text ? (text.length > max ? `${text.slice(0, max)}…` : text) : '';

  return (
    <div className="game-content">
      <div className="game-content-data">
        <div className="game-inline-row">
          <div className="game-header-font">{t('game_tag_theme')}</div>
          <div>{t('game_tag_access_code')} {game.game_code}</div>
        </div>
        <div>{t('game_tag_name')}  {game.configuration.game_name}</div>
        <div>{t('game_tag_prompt')}  {truncate(game.configuration.ai_prompt)}</div>
        <div>{t('game_tag_research')} {t('game_tag_research_allowed')}</div>
        <div>{t('game_tag_time_nbr_questions')} {minutesToHMin(game.configuration.max_duration_minutes)} {game.configuration.max_questions} kierrosta</div>
      </div>
      <div className="game-content-divider"></div>
      <div className="game-content-bottom-row">
        <div className="game-content-actions">
          {stateLink}
          <Link
            label={t('game_tag_edit_game')}
            variant="standalone"
            icon="edit"
            size="2xLarge"
            colour="black"
            href={`/admin/games/${game.game_id}`}
            internal
          />
          <div>
            <button className="button-plain game-button" onClick={() => copyToClipboard(game.game_code)}>
                <Icon name="link" aria-hidden="true" />
                <span>{t('game_tag_copy_code')} </span>
            </button>
          </div>
          <div>
            <button className="button-plain game-button" onClick={() => removeGame(game)}>
              <Icon name="delete" aria-hidden="true" />
              <span>{t('game_tag_delete_game')} </span>
            </button>
          </div>
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
      ai_prompt: PropTypes.string,
    })
  })
};

export default Game;