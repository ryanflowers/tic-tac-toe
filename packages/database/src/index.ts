import type { Prisma } from './generated/client/index.js'

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

export * from './generated/client/index.js'