import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUser, getUsers } from '../../api'
import { Users } from './Users';

const UsersContainer = () => {

  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const createUserMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    mutationFn: createUser
  })

  const onCreateUser = (userName: string | undefined) => {
    userName && createUserMutation.mutate(userName);
  }
 
  return (
    <Users
      users={users}
      onCreateUser={onCreateUser}
      error={error}
      isLoading={isLoading}
    />
  )
}

export { UsersContainer };