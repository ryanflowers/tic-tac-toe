import { GamesContainer } from '@/components/games/GamesContainer'
import styles from './Games.module.css'

export default function GamesPage() {
  return (
    <main className={styles.games}>
      <h1>Game list</h1>
      <GamesContainer />
    </main>
  )
}
