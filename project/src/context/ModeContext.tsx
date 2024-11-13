import React, { createContext, useContext, useState, ReactNode } from 'react';

type Mode = 'focus' | 'deep' | 'general' | 'chill' | 'analytics';

interface ModeSettings {
  defaultDuration: number;
  description: string;
}

export const modeSettings: Record<Mode, ModeSettings> = {
  focus: {
    defaultDuration: 25,
    description: 'Moderate concentration with ambient music',
  },
  deep: {
    defaultDuration: 45,
    description: 'Intense concentration, minimal distractions',
  },
  general: {
    defaultDuration: 30,
    description: 'Flexible focus for everyday tasks',
  },
  chill: {
    defaultDuration: 15,
    description: 'Relaxed state for low-priority tasks',
  },
  analytics: {
    defaultDuration: 0,
    description: 'View your productivity analytics',
  },
};

interface ModeContextType {
  currentMode: Mode;
  setMode: (mode: Mode) => void;
  settings: typeof modeSettings;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [currentMode, setCurrentMode] = useState<Mode>('focus');

  const setMode = (mode: Mode) => {
    setCurrentMode(mode);
  };

  return (
    <ModeContext.Provider value={{ currentMode, setMode, settings: modeSettings }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}