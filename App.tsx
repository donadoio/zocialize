import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import React from 'react';
import {AuthStateType, getAuthInfo} from './src/redux/slices/authSlice';
import AuthenticatedScreenNavigator from './src/screens/AuthenticatedScreenNavigator';
import UnauthenticatedScreenNavigator from './src/screens/UnauthenticatedScreenNavigator';

const AppScreens = () => {
  const authInfo: AuthStateType = useSelector(getAuthInfo);

  return (
    <>
      {!authInfo.authenticated ? (
        // User isn't signed in
        <UnauthenticatedScreenNavigator />
      ) : (
        // User is signed in
        <AuthenticatedScreenNavigator />
      )}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppScreens />
    </Provider>
  );
};

export default App;
