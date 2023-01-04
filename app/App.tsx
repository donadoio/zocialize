import {Provider, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, store} from './src/redux/store';
import React from 'react';
import {
  authSessionExpired,
  AuthStateType,
  authUpdateTokens,
  getAuthInfo,
} from './src/redux/slices/authSlice';
import AuthenticatedScreenNavigator from './src/screens/AuthenticatedScreenNavigator';
import UnauthenticatedScreenNavigator from './src/screens/UnauthenticatedScreenNavigator';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import {Block, GalioProvider} from 'galio-framework';
import {appTheme} from './src/constants';
import jwt_decode from 'jwt-decode';
import {REACT_APP_BACKEND_URL} from '@env';
import UnconfirmedScreenNavigator from './src/screens/UnconfirmedScreenNavigator';

const AppScreens = () => {
  const dispatch: AppDispatch = useDispatch();
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const onScreenChange: () => void = async () => {
    if (authInfo.authenticated) {
      const user: any = jwt_decode(`${authInfo.access_token}`);
      const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (isExpired) {
        try {
          const t = await axios.post(
            `${REACT_APP_BACKEND_URL}/auth/refresh`,
            null,
            {
              headers: {
                Authorization: `Bearer ${authInfo.refresh_token}`,
              },
            },
          );
          console.log(t);
          console.log(t.data);
          t.data
            ? dispatch(authUpdateTokens(t.data))
            : dispatch(authSessionExpired());
        } catch (e) {
          console.log('Unable to refresh tokens.');
          dispatch(authSessionExpired());
        }
      }
    }
  };

  return (
    <NavigationContainer onStateChange={onScreenChange}>
      <GalioProvider theme={appTheme}>
        <Block flex>
          {!authInfo.authenticated ? (
            <UnauthenticatedScreenNavigator />
          ) : !authInfo.confirmed ? (
            <UnconfirmedScreenNavigator />
          ) : (
            <AuthenticatedScreenNavigator />
          )}
        </Block>
      </GalioProvider>
    </NavigationContainer>
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
