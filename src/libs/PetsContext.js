import React, { createContext, useContext, useState } from 'react';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  return <PetsContext.Provider value={{}}>{children}</PetsContext.Provider>;
}
