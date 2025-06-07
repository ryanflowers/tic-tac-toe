import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUser, getUsers } from '../../api'
import styles from './Users.module.css'
import { useState } from 'react'

const Users = () => {

  const queryClient = useQueryClient();
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  const createUserMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    mutationFn: createUser
  })

  const handleCreateUser = () => {
    if(!userName || userName.length < 1) {
      return;
    }
    createUserMutation.mutate(userName);
  }

  if(!users || error){
    return <p className={styles.error}>Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
  }

  if(isLoading){
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
          onChange={handleUserNameChange} 
          aria-label="username" 
          type="text" 
          placeholder="Enter your username"
        />
        <button disabled={!userName || userName.length < 1} onClick={handleCreateUser}>Create User</button>
      </div>
      <div className={styles.users}>
        <label htmlFor="users">Select a User</label>
        <ul id="users" className={styles.usersList}>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { Users };