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
    getFiles: (userId) => {
        const key = `files_${userId || 'guest'}`;
        const filesStr = localStorage.getItem(key);
        return filesStr ? JSON.parse(filesStr) : [];
    },
    saveFiles: (userId, newFiles) => {
        const key = `files_${userId || 'guest'}`;
        const existing = storageService.getFiles(userId);
        // Combine and dedup by name
        const combined = [...existing, ...newFiles];
        const unique = Array.from(new Map(combined.map(item => [item.name, item])).values());
        localStorage.setItem(key, JSON.stringify(unique));
    },
    clear: () => {
        localStorage.clear();
    }
};
