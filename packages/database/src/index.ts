export * from './generated/client/index.js'
export { PrismaClient, GameStatus } from './generated/client/index.js'
import type { Prisma, Game, User, GameUser, Move } from './generated/client/index.js'

export type { Prisma, Game, User, GameUser, Move }

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