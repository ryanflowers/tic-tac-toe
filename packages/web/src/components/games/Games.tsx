import styles from './Games.module.css'
import { useState } from 'react'
import type { Game, User } from '@tic-tac-toe/database'
import { Link } from 'react-router-dom'

const Games = ({
  games,
  users,
  onCreateGame,
  error,
  isLoading,
}: {
  /**
   * The games to display
   */
  games: Game[] | undefined;
  /**
   * The users to display for creating a game
   */
  users: User[] | undefined;
  /**
   * The error to display
   */
  error: Error | null;
  /**
   * The function to create a game
   */
  onCreateGame: (userIds: string[]) => void
  /**
   * Whether the games are loading
   */
  isLoading: boolean;
}) => {

  const [gameUsers, setGameUsers] = useState<string[]>([])
  const onToggleUser = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setGameUsers((prev) => {
      const target = e.target as HTMLInputElement;
      if (prev.includes(target.value)) {
        return prev.filter((user) => user !== target.value)
      }
      return [...prev, target.value]
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!games || !users || error) {
    return (
      <p className={styles.error}>
        Error loading:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    )
  }

  return (
    <div>
      <div className={styles.createGame}>
        <label htmlFor="users">Select Users to Create a Game</label>
        <ul
          id="users"
          className={styles.usersList}
        >
          {users?.map((user) => (
            <li key={user.id}>
              <input className={styles.userCheckbox} value={user.id} id={user.id} type="checkbox" onClick={onToggleUser} />
              <label htmlFor={user.id}>{user.username}</label>
            </li>
          ))}
        </ul>
        <button
          disabled={gameUsers.length < 1}
          onClick={() => onCreateGame(gameUsers)}
        >
          Save
        </button>
      </div>
      <div className={styles.games}>
        <label htmlFor="games">Select a Game</label>
        <ul
          id="games"
          className={styles.gamesList}
        >
          {games.map((game) => (
            <li key={game.id}>
              <Link
                className={styles.gameLink}
                to={`/games/${game.id}`}
              >
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { Games }