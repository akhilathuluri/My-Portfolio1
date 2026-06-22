'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorVariant = 'default' | 'project' | 'link';

interface CursorState {
  variant: CursorVariant;
  text?: string;
}

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({ variant: 'default' });

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
