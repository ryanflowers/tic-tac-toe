import type { Game, User, GameUser, Move, Prisma, GameWithRelations } from '@tic-tac-toe/database'

interface ErrorResponse {
  errors: string[]
}


export type { Game, User, GameUser, Move, Prisma, GameWithRelations, ErrorResponse }