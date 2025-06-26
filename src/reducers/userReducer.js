
const userReducer = (state = { loadingUser: false }, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, loadingUser: false };
        case 'SET_LOADING_USER':
            return { ...state, loadingUser: action.payload }
        default:
            return state;
    }
};

export default userReducer;
