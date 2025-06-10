import styles from './Game.module.css'
import { useAppContext } from '../../context/AppContext';
import type { GameWithRelations } from '@tic-tac-toe/service'

const GameBoard = ({
  game,
  onCreateMove,
  error,
  isLoading,
}: {
  /**
   * The game in play
   */
  game: GameWithRelations | undefined;
  /**
   * The error to display
   */
  error: Error | null;
  /**
   * The function to make a move
   */
  onCreateMove: ({id, cellIndex, userId}: {id: string, cellIndex: number, userId: string}) => void
  /**
   * Whether the game is loading
   */
  isLoading: boolean;
}) => {

  const { currentUser } = useAppContext()
  const isMyTurn = game?.nextTurnPlayer?.userId === currentUser?.id
  const currentPlayer = game?.players.find((player) => player.userId === currentUser?.id)

  if (!currentUser) {
    return <div>No current user</div>
  }

  if (isLoading) {
    return <p>Loading game...</p>
  }

  if (!game || error) {
    return (
      <p className={styles.error}>
        Error loading game:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    )
  }
 
  const cellIndexMovesMap = game.moves.reduce((acc, move) => {
    acc.set(move.cellIndex, move.player.playerKey)
    return acc
  }, new Map<number, string>());
  
  const Cells = game.board.split('').map((_, index) => {
    const playerKey = cellIndexMovesMap.get(index) || '';
    return (
      <div key={index} className={styles.cell}>
        <button onClick={() => {
          if(!isMyTurn) {
            alert('Sorry not your turn')
            return
          }

          if(cellIndexMovesMap.has(index)) {
            alert('Cell already taken')
            return
          }

          onCreateMove({id: game.id, cellIndex: index, userId: currentUser.id})
        }}>{playerKey}</button>
      </div>
    )
  })

  if(game.status === 'COMPLETED') {
    return (
      <div>
        {!game.winnerId ? 'Draw!' : game.winnerId === currentPlayer?.id ? 'You won!' : 'You lost!'}
      </div>
    )
  }

  return (
    <div>
      <div>User: {currentUser.username}</div>
      <div>{ isMyTurn ? 'Your turn!' : 'Waiting for opponent...'}</div>
      <div className={styles.gameBoard}>
        {Cells}
      </div>
    </div>
    
  )
}

export { GameBoard as Game }
