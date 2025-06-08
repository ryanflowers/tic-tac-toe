import styles from './Users.module.css'
import { useState } from 'react'
import type { User } from '@tic-tac-toe/database'
import { useAppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const Users = ({
  users,
  onCreateUser,
  error,
  isLoading,
}: {
  /**
   * The users to display
   */
  users: User[] | undefined;
  /**
   * The error to display
   */
  error: Error | null;
  /**
   * The function to create a user
   */
  onCreateUser: (userName: string | undefined) => void
  /**
   * Whether the users are loading
   */
  isLoading: boolean;
}) => {

  const [userName, setUserName] = useState<string>('')
  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const { setCurrentUser } = useAppContext()

  if (!users || error) {
    return (
      <p className={styles.error}>
        Error loading users:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    )
  }

  if (isLoading) {
    return <p>Loading users...</p>
  }

  return (
    <div>
      <div className={styles.createUser}>
        <label htmlFor="username">Create a User</label>
        {/* TODO: Add proper validation for username. Could choose to use a form here etc */}
        <input
          id="username"
          value={userName}
          onChange={onUserNameChange}
          aria-label="username"
          type="text"
          placeholder="User Name"
        />
        <button
          disabled={userName.length < 1}
          onClick={() => onCreateUser(userName)}
        >
          Save
        </button>
      </div>
      <div className={styles.users}>
        <label htmlFor="users">Select a User</label>
        <ul
          id="users"
          className={styles.usersList}
        >
          {users.map((user) => (
            <li key={user.id}>
              <Link
                onClick={() => setCurrentUser(user)}
                className={styles.userLink}
                to={`/games?userId=${user.id}`}
              >
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { Users }