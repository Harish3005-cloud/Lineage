/**
 * Mock user data for LINEAGE frontend demonstration and testing.
 * Provides sample profiles for each platform role with expected schema shapes.
 */

export const MOCK_USERS = {
  'student@lineage.dev': {
    id: 1,
    name: 'Arjun Sharma',
    email: 'student@lineage.dev',
    role: 'student',
    age: 16,
    skills: ['Python', 'Machine Learning', 'Computer Vision', 'TensorFlow'],
    availability: 'part-time',
    guardian_consent: 'pending',
    avatar_color: '#00b4d8',
  },
  'expert@lineage.dev': {
    id: 2,
    name: 'Dr. Priya Menon',
    email: 'expert@lineage.dev',
    role: 'expert',
    age: 35,
    skills: ['Deep Learning', 'Medical Imaging', 'Research Methodology', 'Edge Computing'],
    availability: 'full-time',
    guardian_consent: 'not_required',
    avatar_color: '#0f3460',
  },
  'sponsor@lineage.dev': {
    id: 3,
    name: 'Vikram Patel',
    email: 'sponsor@lineage.dev',
    role: 'sponsor',
    age: 42,
    skills: [],
    availability: 'advisory',
    guardian_consent: 'not_required',
    avatar_color: '#06d6a0',
  },
  'admin@lineage.dev': {
    id: 4,
    name: 'Neha Gupta',
    email: 'admin@lineage.dev',
    role: 'admin',
    age: 30,
    skills: [],
    availability: 'full-time',
    guardian_consent: 'not_required',
    avatar_color: '#ef476f',
  },
};

export default MOCK_USERS;
