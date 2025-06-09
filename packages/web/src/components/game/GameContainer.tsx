import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getGame, createMove } from '../../api'
import { useParams } from 'react-router-dom';
import { Game } from './Game';

const GameContainer = () => {
  const { id } = useParams()
  const queryClient = useQueryClient();

  const createMoveMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games', id] });
    },
    mutationFn: createMove
  })

  const { data: game, isLoading: isGameLoading, error: gameError } = useQuery({
    queryKey: ['games', id],
    queryFn: () => getGame({ id: id ?? '' }),
    enabled: !!id,
    refetchInterval: 5000, // Refetch data every 5 seconds, not ideal for scaling instead use server events
  });


  if (!id) {
    return <div>No game id</div>
  }

  return (
    <Game
      onCreateMove={createMoveMutation.mutate}
      game={game}
      error={gameError}
      isLoading={isGameLoading}
    />
  )
}

export { GameContainer };