import type { User } from '@tic-tac-toe/database';

const API_URL = 'http://localhost:3001';

// React query requires throwing errors for non-200 responses, not a fan :(

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

const createUser = async (username: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

export {
  getUsers,
  createUser,
}