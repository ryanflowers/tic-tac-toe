export * from './types.js'

import express from 'express'
import { type Request, type Response } from 'express'
import cors from 'cors'
import type { Game, Move, User, GameWithRelations, ErrorResponse, Prisma, GameUser } from './types.js'
import { PrismaClient } from '@tic-tac-toe/database'

console.log('Starting server...')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

const app = express()
const port = process.env.PORT || 3001

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow the web app to make requests to this service
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

app.use(express.json())

app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

// Get all users
app.get(
  '/users',
  async (_req: Request, res: Response<User[] | ErrorResponse>) => {
    try {
      const users = await prisma.user.findMany()
      res.json(users)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).json({ errors: ['Failed to fetch user'] })
    }
  }
)

// Create new user
app.post(
  '/users',
  async (
    req: Request<{}, {}, { username: string }>,
    res: Response<User | ErrorResponse>
  ) => {
    console.log('Creating user:', req.body)
    try {
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
        },
      })
      res.status(201).json(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(500).json({ errors: ['Failed to create user'] })
    }
  }
)

// Get users games
app.get(
  '/users/:userId/games',
  async (req: Request, res: Response<Game[] | ErrorResponse>) => {
    if (!req.params.userId) {
      res.status(400).json({ errors: ['User ID is required'] })
      return
    }

    try {
      const games = await prisma.game.findMany({
        where: {
          players: {
            some: {
              userId: req.params.userId
            }
          }
        }
      })
      res.json(games)
    } catch (error) {
      console.error('Error fetching games:', error)
      res.status(500).json({ errors: ['Failed to fetch games'] })
    }
  }
)

// Create new game
app.post(
  '/games',
  async (
    req: Request<{}, {}, { userIds: string[] }>,
    res: Response<Game | ErrorResponse>
  ) => {
    const userIds = req.body.userIds
    if (userIds.length !== 2) {
      res.status(400).json({ errors: ['Exactly 2 users ID are required to create a game'] })
      return
    }

    try {
      const users = await prisma.user.findMany({
        where: {
          id: { in: userIds },
        },
      })

      const [player1, player2] = users;

      if(!player1 || !player2) {
        res.status(400).json({ errors: ['Unable to find all users for game'] })
        return
      }

      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const game = await tx.game.create({
          data: {
            name: users.map((user: User) => user.username).join(' vs '),
            players: {
              create: [
                {
                  userId: player1.id,
                  playerKey: 'X'
                },
                {
                  userId: player2.id,
                  playerKey: 'O'
                }
              ]
            },
          },
          include: {
            players: true
          }
        });
      
        // Now that we have game users created we can assign on as nextTurnPlayer
        return await tx.game.update({
          where: { id: game.id },
          data: {
            nextTurnPlayerId: game.players[0]?.id
          }
        });
      });

      res.status(201).json(result)
    } catch (error) {
      console.error('Error creating game:', error)
      res.status(500).json({ errors: ['Failed to create game'] })
    }
  }
)

// Get game by id
app.get(
  '/games/:id',
  async (req: Request, res: Response<GameWithRelations | ErrorResponse>) => {
    if (!req.params.id) {
      res.status(400).json({ errors: ['Game ID is required'] })
      return
    }

    try {
      const game = await prisma.game.findUnique({
        where: {
          id: req.params.id
        },
        include: {
          players: {
            include: {
              user: true
            }
          },
          moves: {
            include: {
              player: true
            }
          },
          nextTurnPlayer: {
            include: {
              user: true
            }
          }
        }
      })

      if (!game) {
        res.status(404).json({ errors: ['Game not found'] })
        return
      }

      res.json(game)
    } catch (error) {
      console.error('Error fetching game:', error)
      res.status(500).json({ errors: ['Failed to fetch game'] })
    }
  }
)

// TODO Simplify this function way to complicated there has to be a better way
function checkWinner(matrix: (Move | null)[][]): Move | null {
  if (matrix.length !== 3 || matrix.some(row => row.length !== 3)) {
    return null;
  }

  // Check rows
  for (const row of matrix) {
    const first = row[0];
    const second = row[1];
    const third = row[2];
    if (first && second && third && 
        first.playerId === second.playerId && 
        second.playerId === third.playerId) {
      return first;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    const first = matrix?.[0]?.[i];
    const second = matrix?.[1]?.[i];
    const third = matrix?.[2]?.[i];
    if (first && second && third && 
        first.playerId === second.playerId && 
        second.playerId === third.playerId) {
      return first;
    }
  }

  // Check diagonals
  const topLeft = matrix?.[0]?.[0];
  const middle = matrix?.[1]?.[1];
  const bottomRight = matrix?.[2]?.[2];
  if (topLeft && middle && bottomRight && 
      topLeft.playerId === middle.playerId && 
      middle.playerId === bottomRight.playerId) {
    return topLeft;
  }

  const topRight = matrix?.[0]?.[2];
  const bottomLeft = matrix?.[2]?.[0];
  if (topRight && middle && bottomLeft && 
      topRight.playerId === middle.playerId && 
      middle.playerId === bottomLeft.playerId) {
    return topRight;
  }

  return null;
}

// Create a game move
app.post(
  '/games/:id/moves',
  async (
    req: Request<{id: string}, {}, { cellIndex: number, userId: string }>,
    res: Response<Game | ErrorResponse>
  ) => {
    const { id } = req.params

    const { cellIndex, userId } = req.body

    if (!id) {
      res.status(400).json({ errors: ['Game ID is required'] })
      return
    }

    if (cellIndex === undefined || !userId) {
      res.status(400).json({ errors: ['Cell index and user ID are required'] })
      return
    }

    try {
      const gameUsers = await prisma.gameUser.findMany({
        where: {
          gameId: id,
        },
      })

      if(gameUsers.length !== 2) {
        res.status(400).json({ errors: ['Unable to find user for game'] })
        return
      }

      const currentGameUser = gameUsers.find((gameUser: GameUser) => gameUser.userId === userId)
      if(!currentGameUser) {
        res.status(400).json({ errors: ['Unable to find current user for game'] })
        return
      }

      const otherGameUser = gameUsers.find((gameUser: GameUser) => gameUser.userId !== userId)

      // Now that we have the move update the game nextTurnPlayer
      const result = await prisma.game.update({
        where: { id },
        data: {
          nextTurnPlayerId: otherGameUser?.id,
          status: 'IN_PROGRESS',
          moves: {
            create: {
              cellIndex,
              playerId: currentGameUser.id
            }
          },
        },
        include: {
          moves: true
        }
      });

      // Now that we have the move update the game board, validate if the game is over
      const moveMap = new Map<number, Move>();
      result.moves.forEach((move: Move) => {
        moveMap.set(move.cellIndex, move);
      }) 

      const cellCount = result.board.split('').length;
      const rowColumnCount = Math.sqrt(cellCount);
     
      const matrix = new Array(rowColumnCount).fill([]).map((_, index) => {
        return Array.from({ length: rowColumnCount }, (_, i) => moveMap.get(index * rowColumnCount + i))
      })

      const winner = checkWinner(matrix);

      // TODO Check for draw

      if(winner) {
        console.log('=======================UPDATE GAME STATUS TO COMPLETED:' + winner.playerId) // TODO Remove this
        await prisma.game.update({
          where: { id },
          data: {
            status: 'COMPLETED',
            winnerId: winner.playerId
          }
        })
      }

      res.status(201).json(result)
    } catch (error) {
      console.error('Error creating move:', error)
      res.status(500).json({ errors: ['Failed to create move'] })
    }
  }
)

process.on('beforeExit', async () => {
  await prisma.$disconnect()
  console.log('Service stopped')
})

app.listen(port, () => {
  console.log(`Service running on port ${port}`)
})