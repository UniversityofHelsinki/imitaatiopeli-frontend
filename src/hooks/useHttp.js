import { createContext, useContext, useEffect, useState } from 'react';
import localStorage from '../utilities/localStorage.js';

const baseUrl = import.meta.env.VITE_APP_IMITATION_BACKEND_SERVER || '';

const getPlayer = () => localStorage.get('player');

const cache = (() => {
    const content = {};
    const tags = {};

    const get = (tag) => {
        const hit = content[tag];
        if (hit && hit.invalidated) {
            return null;
        }
        return hit;
    };

    const set = (tag, value) => {
        if (tag) {
            content[tag] = {
                response: value,
                invalidated: false,
            };
        }
    };

    const has = (tag) => {
        return Object.hasOwn(content, tag) && !content[tag].invalidated;
    };

    const remove = (key) => {
        delete content[key];
    };

    const invalidate = (tag) => {
        if (content[tag]) {
            content[tag].invalidated = true;
        }
    };

    return { get, set, has, remove, invalidate };
})();

const client = async (path, tag, options = {}) => {
    const player = getPlayer();
    console.log("HIT");
    console.log(player);

    const fetchOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            ...(player && {
                'X-Player-Session-Token': player.session_token?.toString() || '',
                'X-Player-Nickname': player.nickname || '',
                'X-Player-Id': player.player_id || '',
                'X-Player-Game-Id': player.game_id || '',
            }),
        },
    };

    let request;
    if (!tag) {
        request = fetch(`${baseUrl}${path}`, fetchOptions);
    } else if (!cache.has(tag)) {
        cache.set(tag, fetch(`${baseUrl}${path}`, fetchOptions));
    }
    request = request || cache.get(tag).response;

    const response = (await request).clone();

    if (!response.ok) {
        cache.remove(tag);
        throw new Error(`Unexpected status code ${response.status} from ${path}`, {
            cause: {
                ok: response.ok,
                status: response.status,
            },
        });
    }

    try {
        return {
            ok: response.ok,
            status: response.status,
            body: await response.json(),
        };
    } catch (error) {
        console.error(error.message);
        return {
            ok: response.ok,
            status: response.status,
        };
    }
};

export const useGET = ({ path, tag, fetchOnlyIf = true }) => {
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const get = async () => {
        try {
            const response = await client(path, tag);
            setValue(response.body);
            setError(null);
        } catch (error) {
            console.error(error.message);
            setError(error.cause || {});
            setValue(null);
        }
    };

    useEffect(() => {
        if (fetchOnlyIf) {
            get();
        }
    }, []);

    if (!cache.has(tag) && !error) {
        if (fetchOnlyIf) {
            get();
        }
    }

    const reload = get;
    return [value, error, reload];
};

export const get = async ({ path, tag }) => {
    try {
        return await client(path, tag);
    } catch (error) {
        console.error(error.message);
        return error.cause || {};
    }
};

export const usePOST = ({ path, invalidates = [] }) => {
    const player = getPlayer();
    const post = async (body) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Player-Session-Token': player?.session_token?.toString() || '',
                    'X-Player-Nickname': player?.nickname || '',
                    'X-Player-Id': player?.player_id || '',
                    'X-Player-Game-Id': player?.game_id || '',
                },
            });
            if (response.ok) {
                invalidates.forEach((tag) => {
                    cache.invalidate(tag);
                });
            }
            return response;
        } catch (error) {
            console.error(error.message);
            return error;
        }
    };

    return post;
};

export const usePUT = ({ path, invalidates = [] }) => {
    const player = getPlayer();
    const put = async (body) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Player-Session-Token': player?.session_token?.toString() || '',
                    'X-Player-Nickname': player?.nickname || '',
                    'X-Player-Id': player?.player_id || '',
                    'X-Player-Game-Id': player?.game_id || '',
                },
            });
            if (response.ok) {
                invalidates.forEach((tag) => {
                    cache.invalidate(tag);
                });
            }
            return response;
        } catch (error) {
            console.error(error.message);
            return error;
        }
    };

    return put;
};

export const useDELETE = ({ path, invalidates = [] }) => {
    const player = getPlayer();
    const deleteFn = async (body) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Player-Session-Token': player?.session_token?.toString() || '',
                    'X-Player-Nickname': player?.nickname || '',
                    'X-Player-Id': player?.player_id || '',
                    'X-Player-Game-Id': player?.game_id || '',
                },
            });
            if (response.ok) {
                invalidates.forEach((tag) => {
                    cache.invalidate(tag);
                });
            }
            return response;
        } catch (error) {
            console.error(error.message);
            return error;
        }
    };

    return deleteFn;
};

export const invalidate = (tags = []) => {
    tags.forEach((tag) => {
        cache.invalidate(tag);
    });
};
