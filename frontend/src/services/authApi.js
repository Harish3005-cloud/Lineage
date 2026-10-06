import { MOCK_USERS } from '../data/mockUsers';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || '/api';
const MOCK_CUSTOM_USERS_KEY = 'lineage_mock_custom_users';

/**
 * Retrieves custom registered users from localStorage in mock mode
 */
const getCustomUsers = () => {
  try {
    const data = localStorage.getItem(MOCK_CUSTOM_USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.warn('Unable to load mock registered users from localStorage:', err);
    return {};
  }
};

/**
 * Persists a custom registered user into localStorage for session persistence in mock mode
 */
const saveCustomUser = (user) => {
  try {
    const customUsers = getCustomUsers();
    customUsers[user.email.toLowerCase().trim()] = user;
    localStorage.setItem(MOCK_CUSTOM_USERS_KEY, JSON.stringify(customUsers));
  } catch (err) {
    console.warn('Unable to save custom user to localStorage:', err);
  }
};

/**
 * Looks up user by email from predefined mock users or dynamic registered mock users
 */
const findMockUser = (email) => {
  if (!email) return null;
  const normalized = email.toLowerCase().trim();
  if (MOCK_USERS[normalized]) {
    return MOCK_USERS[normalized];
  }
  const custom = getCustomUsers();
  return custom[normalized] || null;
};

/**
 * Generates a mock JWT-like token containing user identity
 */
const generateMockToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    issuedAt: Date.now(),
  };
  return `mock_token_${btoa(JSON.stringify(payload))}`;
};

/**
 * Parses payload from mock token
 */
const parseMockToken = (token) => {
  if (!token || typeof token !== 'string' || !token.startsWith('mock_token_')) {
    return null;
  }
  try {
    const base64 = token.replace('mock_token_', '');
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.warn('Could not parse mock token:', err);
    return null;
  }
};

export const authApi = {
  /**
   * Log in user with credentials.
   * Calls backend API first; falls back to mock authentication if unavailable.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ token: string, user: object }>}
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`API login request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        token: data.token || data.access_token,
        user: data.user,
      };
    } catch (apiError) {
      console.info('Backend API unavailable. Operating in mock authentication mode.');
      
      const foundUser = findMockUser(email);
      if (!foundUser) {
        throw new Error(`Invalid credentials. Demo accounts available: ${Object.keys(MOCK_USERS).join(', ')}`);
      }

      const token = generateMockToken(foundUser);
      return {
        token,
        user: foundUser,
      };
    }
  },

  /**
   * Register a new user.
   * Calls backend API first; falls back to mock registration if unavailable.
   *
   * @param {object} userData
   * @returns {Promise<{ token: string, user: object }>}
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`API register request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        token: data.token || data.access_token,
        user: data.user,
      };
    } catch (apiError) {
      console.info('Backend API unavailable. Registering user in mock mode.');

      const age = userData.age != null ? Number(userData.age) : 20;
      const isMinor = age < 18;

      let skillsArray = [];
      if (Array.isArray(userData.skills)) {
        skillsArray = userData.skills;
      } else if (typeof userData.skills === 'string' && userData.skills.trim()) {
        skillsArray = userData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      }

      const newUser = {
        id: Date.now(),
        name: userData.name || userData.fullName || 'Demo User',
        email: userData.email,
        role: userData.role || 'student',
        age: age,
        skills: skillsArray,
        availability: userData.availability || 'part-time',
        guardian_consent: userData.guardian_consent || (isMinor ? 'pending' : 'not_required'),
        avatar_color: userData.avatar_color || '#00b4d8',
      };

      saveCustomUser(newUser);
      const token = generateMockToken(newUser);

      return {
        token,
        user: newUser,
      };
    }
  },

  /**
   * Validates token and returns current user details.
   * Calls backend API first; falls back to mock token resolution.
   *
   * @param {string} token
   * @returns {Promise<{ user: object }>}
   */
  async getCurrentUser(token) {
    if (!token) {
      throw new Error('No authentication token provided.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API getCurrentUser failed with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        user: data.user || data,
      };
    } catch (apiError) {
      // Decode mock token if available
      const parsed = parseMockToken(token);
      if (parsed && parsed.email) {
        const found = findMockUser(parsed.email);
        if (found) {
          return { user: found };
        }
      }

      // Check stored user backup in localStorage
      try {
        const cached = localStorage.getItem('lineage_user');
        if (cached) {
          return { user: JSON.parse(cached) };
        }
      } catch (err) {
        console.warn('Failed reading cached user:', err);
      }

      throw new Error('Failed to restore user session.');
    }
  },
};

export default authApi;
