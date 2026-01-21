import { loginUser } from '../api/auth.api';
import { storageService } from './storage.service';

export const authService = {
    login: async (email, password) => {
        const result = await loginUser(email, password);
        if (result.success) {
            // Mocking a token since the mock API might not return one suitable for real auth
            const token = result.user.token || 'mock-token-' + Date.now();
            storageService.setToken(token);
            storageService.setUser(result.user);
        }
        return result;
    },
    logout: () => {
        storageService.removeToken();
        storageService.removeUser();
    },
    isAuthenticated: () => {
        return !!storageService.getToken();
    },
    getCurrentUser: () => {
        return storageService.getUser();
    }
};
