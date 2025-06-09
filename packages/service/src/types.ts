import type { Game, User, GameUser, Move, Prisma } from '@tic-tac-toe/database'

export interface ErrorResponse {
  errors: string[]
}


export type GameWithRelations = Prisma.GameGetPayload<{
  include: {
    moves: {
      include: {
        player: true
      }
    },
    players: {
      include: {
        user: true
      }
    },
    nextTurnPlayer: {
      include: {
        user: true
      }
    }
  }
}>

export type { Game, User, GameUser, Move, Prisma }