import axios from 'axios';

// Mock API URL provided in previous context
const API_URL = 'https://696ff036a06046ce618837d3.mockapi.io/login/login';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(API_URL);
    // The previous context mentioned parsing a nested 'users' array
    // Assuming the API returns an array or object with a users property
    // We'll need to filter client-side since it's a mock API often
    const users = response.data.users || response.data; 
    
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
