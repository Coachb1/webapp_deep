"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HelpModeContextType {
  helpModeState: boolean;
  updateHelpModeState: (newState: boolean) => void;
}

const HelpModeContext = createContext<HelpModeContextType | undefined>(
  undefined
);

export const UseHelpMode = () => {
  const context = useContext(HelpModeContext);
  if (!context) {
    throw new Error("useHelpMode must be used within a HelpModeProvider");
  }
  return context;
};

interface HelpModeProviderProps {
  children: ReactNode;
}

export const HelpModeProvider = ({ children }: HelpModeProviderProps) => {
  const [helpModeState, setHelpModeState] = useState<boolean>(
    /* Initial state here */
    false
  );

  const updateHelpModeState = (newState: boolean) => {
    setHelpModeState(newState);
  };

  return (
    <HelpModeContext.Provider value={{ helpModeState, updateHelpModeState }}>
      {children}
    </HelpModeContext.Provider>
  );
};
