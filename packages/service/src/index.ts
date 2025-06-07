import express from 'express';
import { type Request, type Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@tic-tac-toe/database';
import type { User } from '@tic-tac-toe/database';

console.log('Starting server...');

interface ErrorResponse {
  errors: string[];
}

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// TODO: Add logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Get all users
app.get('/users', async (_req: Request, res: Response<User[] | ErrorResponse>) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ errors: ['Failed to fetch user'] });
  }
});

// Create new user
app.post('/users', async (req: Request<{}, {}, { username: string }>, res: Response<User | ErrorResponse>) => {
  console.log('Creating user:', req.body);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ errors: ['Failed to create user'] });
  }
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
  console.log('Service stopped');
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});