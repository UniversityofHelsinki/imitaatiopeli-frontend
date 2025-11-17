import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import { get } from '../../../hooks/useHttp';
import JoinGameForm from '../../game/form/JoinGameForm';
import './JoinGame.css';
import localStorage from '../../../utilities/localStorage';
import PublicPage from "./PublicPage.jsx";
import useJudgeAskedQuestion from "../../../hooks/useJudgeAskedQuestion.js";
import {useSocket} from "../../../contexts/SocketContext.jsx";

const JoinGame = () => {
    const { isConnected, emit, on, off } = useSocket();
    const { t } = useTranslation();
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState();
    const [alreadyJoined, setAlreadyJoined] = useState(false);
    const [playerConfiguration, setPlayerConfiguration] = useState(null);
    const navigate = useNavigate();
    const [_askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();
    const [cookieExists, setCookieExists] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await get({
                path: `/public/games/${code}`,
                tag: `GAME_${code}`
            });
            setAskedQuestion(null);
            setGame(response.body);
            setPlayerConfiguration(response.body.configuration?.[0]);
            if (!!localStorage.get('player')?.game_id && localStorage.get('player')?.game_id !== response.body.game_id) {
                localStorage.clear();
            }
            setAlreadyJoined(localStorage.get('player')?.game_id === response.body.game_id);
            setCookieExists(localStorage.get('player')?.session_token !== null);
            setLoading(false);
        })();
    }, [code]);

    const gameAlreadyStarted = () => {
        return <div className="join-game-font-size">{t('join_game_player_cant_joined')} </div>
    }

    useEffect(() => {
        if (localStorage.get('player')?.session_token) {
            if (localStorage.get('player').game_id && localStorage.get('player').player_id) {
                if (localStorage.get('player').code === code) {
                    emit('join-game', {
                        userId: localStorage.get('player').player_id,
                        gameId: localStorage.get('player').game_id,
                        nickname: localStorage.get('player').nickname,
                        session_token: localStorage.get('player').session_token.toString(),
                    });
                    navigate(`/games/${localStorage.get('player').game_id}/play`, { replace: true });
                }
            }
        }
    }, [cookieExists]);

    useEffect(() => {
        if (!game) return; // wait until game is set
        !alreadyJoined && navigate(`/games/${code}/join`, { replace: true });
    }, [game, alreadyJoined]);

    return (
        <>
            {game?.start_time != null ? (gameAlreadyStarted()
            ) : (
                <PublicPage
                    loading={loading}
                    heading={!alreadyJoined && t('join_game_page_heading')}
                    configuration={playerConfiguration}
                >
                    {alreadyJoined && <span>{t('join_game_player_already_joined')}</span> || <JoinGameForm game={game} /> }
                </PublicPage>)}
        </>
    );

};

JoinGame.propTypes = {
};

export default JoinGame;
