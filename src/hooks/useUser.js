import { useDispatch, useSelector } from 'react-redux';

const IMITATION_BACKEND_SERVER = import.meta.env.VITE_APP_IMITATION_BACKEND_SERVER || '';

const getUser = async () => {
    const URL = `${IMITATION_BACKEND_SERVER}/api/user`;
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            return null; // Handle 401 by returning null user
        } else if (response.status === 403) {
            return null; // Handle 403 by returning null user
        } else {
            throw new Error(`Unexpected status code ${response.status} from ${URL}`);
        }
    } catch (error) {
        throw new Error(`Error occurred while fetching user from ${URL}`, {
            cause: error,
        });
    }
};

const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const loadUser = async () => {
        dispatch({ type: 'SET_LOADING_USER', payload: true });
        try {
            const userData = await getUser();
            dispatch({ type: 'SET_USER', payload: userData });
        } catch (error) {
            console.error('Failed to load user:', error);
        } finally {
            dispatch({ type: 'SET_LOADING_USER', payload: false });
        }
    };

    return [user, loadUser];
};

export default useUser;
