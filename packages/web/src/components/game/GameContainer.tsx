import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getGame } from '../../api'
import { useParams } from 'react-router-dom';
import { Game } from './Game';

const GameContainer = () => {
  const { id } = useParams()
  const queryClient = useQueryClient();

  // const { data: users, isLoading: isUsersLoading, error: usersError } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: getUsers
  // });

  const { data: game, isLoading: isGameLoading, error: gameError } = useQuery({
    queryKey: ['games', id],
    queryFn: () => getGame({ id: id ?? '' }),
    enabled: !!id
  });


  if (!id) {
    return <div>No game id</div>
  }

  // const createGameMutation = useMutation({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['games'] });
  //   },
  //   mutationFn: createGame
  // })

  // const onCreateGame = (userIds: string[]) => {
  //   createGameMutation.mutate(userIds);
  // }
 
  return (
    <Game
      onCreateMove={() => {}}
      game={game}
      error={gameError}
      isLoading={isGameLoading}
    />
  )
}

export { GameContainer };