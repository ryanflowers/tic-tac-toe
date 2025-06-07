import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ErrorPage from './pages/ErrorPage'
import GamesPage from './pages/GamesPage'

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
        path: 'game/:id',
        element: <GamePage />,
      },
    ],
  },
])