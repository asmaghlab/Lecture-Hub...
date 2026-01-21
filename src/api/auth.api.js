import axios from 'axios';

// Mock API URL provided in previous context
const API_URL = 'https://696ff036a06046ce618837d3.mockapi.io/login/login';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(API_URL);
    // The previous context mentioned parsing a nested 'users' array
    // The API returns an array, and the first element contains the "users" array
    // Structure: [{ "users": [...] }]
    const users = (response.data[0] && response.data[0].users) ? response.data[0].users : [];

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
