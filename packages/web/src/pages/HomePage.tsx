
import { Users } from '@/components/users/Users'
import styles from '../styles/Home.module.css'

export default function HomePage() {
  
  return (
    <main className={styles.main}>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <Users />
    </main>
  )
}