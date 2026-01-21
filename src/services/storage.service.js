export const storageService = {
    getToken: () => {
        return localStorage.getItem('token');
    },
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeToken: () => {
        localStorage.removeItem('token');
    },
    getUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    removeUser: () => {
        localStorage.removeItem('user');
    },
    clear: () => {
        localStorage.clear();
    }
};
