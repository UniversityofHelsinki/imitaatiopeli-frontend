const get = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error.message);
    }
};

const remove = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(error.message);
    }
};

const clear = () => localStorage.clear();

export default {
    get, set, remove, clear
};
