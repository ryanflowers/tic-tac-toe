import React, { createContext, useContext, useState } from 'react';
import type { User } from '@tic-tac-toe/database';

type AppContextType = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}