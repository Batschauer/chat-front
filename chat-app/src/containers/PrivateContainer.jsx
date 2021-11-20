import React, { useState, useContext } from 'react';
import { authProvider } from '../providers/auth';

/*
  @user: string
  @signin: (user: string, callback: VoidFunction) => void
  @signout: (callback: VoidFunction) => void
*/
let AuthContext = React.createContext(null);

function AuthProvider(
  { children } /* :{ children: React.ReactNode } */
) {
  const [user, setUser] = useState(null);

  let signin = (userName, callback) => {
    return authProvider.signin(() => {
      setUser(userName);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
