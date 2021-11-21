import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { authProvider } from '../providers/auth';
import allActions from '../redux/actions';

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
  const dispatch = useDispatch();

  let signin = (userName, callback) => {
    return authProvider.signin(() => {
      setUser(userName);
      dispatch(allActions.doSetLogin({ userName, key: '' }));
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      dispatch(allActions.doResetLogin());
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
