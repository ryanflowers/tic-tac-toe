import type { User } from '@tic-tac-toe/database'
import { getApiUrl } from './endpoints'

/**
 * Get all users
 * @returns A list of users
 */
const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${getApiUrl()}/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

/**
 * Create a new user
 * @param username - The username of the user
 * @returns The created user
 */
const createUser = async (username: string): Promise<User> => {
  const response = await fetch(`${getApiUrl()}/users`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return response.json()
}

export { getUsers, createUser }