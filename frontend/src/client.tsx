import React, { FC } from 'react';
import { Base } from './utils';

const backendUrl = 'http://localhost:5000';

export const ConnectionContext = React.createContext(backendUrl);

export const ConnectionContextProvider: FC<Base> =
  ({ children }) => (
  <ConnectionContext.Provider value={backendUrl}>
    {children}
  </ConnectionContext.Provider>
);

export const useConnection = () => React.useContext(ConnectionContext);
