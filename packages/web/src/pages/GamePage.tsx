import { useParams } from 'react-router-dom'

export default function GamePage() {
  const { id } = useParams()

  return (
    <div>
      <h1>Game {id}</h1>
      {/* Game board will go here */}
    </div>
  )
}