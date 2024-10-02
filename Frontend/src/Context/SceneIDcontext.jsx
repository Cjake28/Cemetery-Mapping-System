import React, { createContext, useState, useContext } from 'react';

const SenceIDContext = createContext();

export function SceneIDProvider({ children }) {
  const [sceneID, setSceneID] = useState(null);

  return (
    <SenceIDContext.Provider value={{ sceneID, setSceneID }}>
      {children}
    </SenceIDContext.Provider>
  );
}

export const useSceneIdContext = () => {
  return useContext(SenceIDContext);
};
