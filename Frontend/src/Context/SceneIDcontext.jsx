import React, { createContext, useState } from 'react';

export const SenceIDContext = createContext();

export function SceneIDProvider({ children }) {
  const [sceneID, setSenceID] = useState(null);

  return (
    <SenceIDContext.Provider value={{ sceneID, setSenceID }}>
      {children}
    </SenceIDContext.Provider>
  );
}
