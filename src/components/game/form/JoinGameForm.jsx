import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JoinGameForm.css'
import NickNameField from './NickNameField';
import { useTranslation } from 'react-i18next';
import useJoinGame from '../../../hooks/useJoinGame';
import BottomRow from './BottomRow';
import FormButtons from './FormButtons';
import localStorage from '../../../utilities/localStorage';
import { useNavigate } from 'react-router-dom';
import ResearchPermissionForm from './ResearchPermissionForm';
import usePublicPlayer from "../../../hooks/usePublicPlayer.js";
import { useSocket } from '../../../contexts/SocketContext.jsx';

const emptyJoining = {
    nickname: '',
};

const JoinGameForm = ({ game }) => {
    const { isConnected, emit, on, off } = useSocket();
    const { t } = useTranslation();
    const [players= []] = usePublicPlayer(game?.game_id);
    const [player, setPlayer] = useState(emptyJoining);
    const join = useJoinGame(game);
    const [saving, setSaving] = useState(false);
    const [phase, setPhase] = useState('nickname');
    const [nicknameError, setNicknameError] = useState('');
    const navigate = useNavigate();

    const onChange = (key, value) => {
        setPlayer({ ...player, [key]: value });
        if (key === 'nickname') {
            if (value.length > 100) {
                setNicknameError(t('nickname_too_long'));
            } else if (value.trim() === '') {
                setNicknameError('');
            } else {
                const nicknameExists = players?.some(p => {
                    return p.nickname.toLowerCase() === value.toLowerCase();
                });
                if (nicknameExists) {
                    setNicknameError(t('nickname_already_in_use'));
                } else {
                    setNicknameError('');
                }
            }
        }
    };

    const isFormDisabled = () => {
        const nicknameEmpty = !player.nickname || player?.nickname.trim() === '';
        const nicknameTooLong = player?.nickname?.length > 100;
        const nicknameExists = players?.some(p =>
            p.nickname.toLowerCase() === player.nickname.toLowerCase()
        );
        return saving || nicknameEmpty || nicknameExists || nicknameTooLong;
    };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const nicknameExists = players.some(p => p.nickname.toLowerCase() === player.nickname.toLowerCase());
      const nicknameTooLong = player?.nickname?.length > 100;
      if (nicknameExists) {
          setNicknameError(t('nickname_already_in_use'));
          return;
      }
      if (nicknameTooLong) {
          setNicknameError(t('nickname_too_long'));
          return;
      }
      const researchPermissionRequired = phase === 'nickname' && game.configuration[0].is_research_game;
      if (researchPermissionRequired) {
          setPhase('research-permission');
          return;
      }

      setSaving(true);

      try {
          const response = await join({ ...player, code: game.game_code });

          if (!response.ok) {
              throw new Error(`Join request failed: ${response.status}`);
          }

          const playerData = await response.json();
          localStorage.set("player", { ...playerData, code: game.game_code });

          if (isConnected && game?.game_id && playerData?.player_id) {
              emit('join-game', {
                  userId: playerData?.player_id,
                  gameId: game?.game_id,
                  nickname: playerData?.nickname,
                  session_token: playerData?.session_token?.toString(),
              });
          }

          navigate(`/games/${game.game_code}`);
      } catch (error) {
          console.error('Failed to join game:', error);
      } finally {
          setSaving(false);
      }
  };

    const handleReset = (event) => {
        event.preventDefault();
        setPlayer(emptyJoining);
        setNicknameError('');
    };

    const basicForm = (
        <form className="form join-game-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-field join-game-form-field">
                <NickNameField
                    value={player.nickname}
                    disabled={saving}
                    onChange={(value) => onChange('nickname', value)}
                    validation={nicknameError ? { message: nicknameError, type: 'error' } : undefined}
                />
            </div>
            <p>
              {t('join_game_cookies_announcement')}
            </p>
            <div className="horizontal-divider"></div>
            <div className="join-game-form-bottom-row">
                <BottomRow saving={saving}>
                    <FormButtons disabled={isFormDisabled()} />
                </BottomRow>
            </div>
        </form>
    );

    const form = (() => {
        if (phase === 'research-permission') {
            return <ResearchPermissionForm
                game={game}
                onSubmit={handleSubmit}
                saving={saving}
                configuration={game.configuration[0]}
            />
        }
        return basicForm;
    })();

    return form;

};

JoinGameForm.propTypes = {
    game: PropTypes.object,
};

export default JoinGameForm;
