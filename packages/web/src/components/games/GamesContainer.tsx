import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createGame, getUserGames, getUsers } from '../../api'
import { Games } from './Games'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const GamesContainer = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId') ?? undefined;
  const { currentUser } = useAppContext()

  const queryClient = useQueryClient();

  const { data: users, isLoading: isUsersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const { data: games, isLoading: isGamesLoading, error: gamesError } = useQuery({
    queryKey: ['userGames', userId],
    queryFn: () => getUserGames({userId: userId ?? ''}),
    enabled: !!userId
  });

  const createGameMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames', userId] });
    },
    mutationFn: createGame
  })

  const onCreateGame = (userIds: string[]) => {
    createGameMutation.mutate(userIds);
  }
 

  if (!currentUser || userId !== currentUser.id) {
    return <div>Current user does not match the user id in the url</div>
  }

  return (
    <Games
      users={users}
      games={games}
      onCreateGame={onCreateGame}
      error={usersError || gamesError}
      isLoading={isGamesLoading || isUsersLoading}
    />
  )
}

export { GamesContainer };