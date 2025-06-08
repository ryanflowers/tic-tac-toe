import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'
import GamesPage from './pages/games/GamesPage'

// Define the expected query parameters for each route
export interface GamesSearchParams {
  userId?: string;
}

const ErrorPage = () => {
  return <div>Rut Roh! Something went wrong.</div>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'games',
        element: <GamesPage />,
      },
      {
        path: 'games/:id',
        element: <GamePage />,
      },
    ],
  },
])
