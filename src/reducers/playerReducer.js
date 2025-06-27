
const playerReducer = (state = { loadingPlayer: false }, action) => {
    switch (action.type) {
        case 'GET_PLAYER_COURSE':
            return { ...state, player: action.payload, loadingPlayer: false };
        default:
            return state;
    }
};

export default playerReducer;
