import { useState } from 'react';
import localStorage from "../utilities/localStorage.js";

const usePlayerStatus = () => {
    const player = localStorage.get('player');
    const [playerStatus, setPlayerStatus] = useState(null);

    const headers = {
      'Content-Type': 'application/json',
      'X-Player-Session-Token': player.session_token?.toString() || '',
      'X-Player-Nickname': player.nickname || '',
      'X-Player-Id': player.player_id || '',
      'X-Player-Game-Id': player.game_id || '',
    };

    const baseUrl = import.meta.env.VITE_APP_IMITATION_BACKEND_SERVER || '';

    const fetchNow = async () => {
      const response = await fetch(`${baseUrl}/public/answerer/status`, { headers });
      if (response.ok) {
        const body = await response.json();
        console.log(body);
        // { "status": "answer" }
        setPlayerStatus(body);
      }
    };

    return { playerStatus, fetchNow };
};

export default usePlayerStatus;
