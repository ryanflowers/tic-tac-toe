import type { Game } from '@tic-tac-toe/database'
import { getApiUrl } from './endpoints'
import type { GameWithRelations } from '@tic-tac-toe/service'

/**
 * Get all games for a user
 * @param userId - The id of the user
 * @returns A list of games
 */
const getUserGames = async ({userId}: {userId: string}): Promise<Game[]> => {
  const response = await fetch(`${getApiUrl()}/users/${userId}/games`)

  if (!response.ok) {
    throw new Error('Failed to fetch games for user')
  }

  return response.json()
}

const getGame = async ({id}: {id: string}): Promise<GameWithRelations> => {
  const response = await fetch(`${getApiUrl()}/games/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch game')
  }

  return response.json()
}

/**
 * Create a new game for a list of users
 * @param userIds - The ids of the users
 * @returns The created game
 */
const createGame = async (userIds: string[]): Promise<Game> => {
  const response = await fetch(`${getApiUrl()}/games`, {
    method: 'POST',
    body: JSON.stringify({ userIds }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create game')
  }

  return response.json()
}

export { getGame, getUserGames, createGame } 
