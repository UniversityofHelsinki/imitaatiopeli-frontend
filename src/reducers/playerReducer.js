const initialState = {
    player: null,
    players: [],
    loadingPlayer: false,
    error: null
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PLAYER':
            return {
                ...state,
                player: action.payload,
                loadingPlayer: false
            };
        case 'GET_PLAYERS':
            return {
                ...state,
                players: action.payload,
                loadingPlayer: false
            };
        case 'GET_JUDGE_PLAYER_PAIRS':
            return {
                ...state,
                judgeplayerpairs: action.payload,
                loadingPlayer: false
            };
        case 'GET_PLAYROOM_JUDGE_PLAYER_PAIRS':
            return {
                ...state,
                playroomjudgeplayerpairs: action.payload,
                loadingPlayer: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loadingPlayer: true,
                error: null
            };
        case 'SET_ERROR':
            return {
                ...state,
                loadingPlayer: false,
                error: action.payload
            };
        case 'GET_JUDGE_QUESTION' :
            return {
                ...state,
                judgeQuestion: action.payload,
            };
        default:
            return state;
    }
};

export default playerReducer;
