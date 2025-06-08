import type { Game, User, GameUser, Move, Prisma } from 'db'

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

export type { Game, User, GameUser, Move }