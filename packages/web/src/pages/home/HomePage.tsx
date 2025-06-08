import styles from './Home.module.css'
import { UsersContainer } from '@/components/users/UsersContainer'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <UsersContainer />
    </main>
  )
}
