import React, { createContext, useState } from 'react';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};
