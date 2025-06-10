import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { UserConfig, Plugin } from 'vite'

const config: UserConfig = {
  plugins: [react() as unknown as Plugin],
  resolve: {
    alias: {
      '@tic-tac-toe/database': path.resolve(__dirname, '../database/src'),
      '@tic-tac-toe/service': path.resolve(__dirname, '../service/src'),
    },
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
}

export default defineConfig(config)