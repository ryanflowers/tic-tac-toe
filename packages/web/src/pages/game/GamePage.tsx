import { GameContainer } from '@/components/game/GameContainer'
import styles from './Game.module.css'

export default function GamePage() {

  return (
    <main className={styles.game}>
      <h1>Tic-Tac-Toe</h1>
      <GameContainer />
    </main>
  )
}
