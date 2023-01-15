import {Provider, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, store} from './src/redux/store';
import React, {useEffect, useState} from 'react';
import {
  authLogout,
  authSessionExpired,
  authUpdateTokens,
  getAuthInfo,
} from './src/redux/slices/auth/authSlice';
import NavigatorAuthenticatedScreen from './src/screens/NavigatorAuthenticatedScreen';
import NavigatorUnauthenticatedScreen from './src/screens/NavigatorUnauthenticatedScreen';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import {Block, GalioProvider} from 'galio-framework';
import {appTheme} from './src/constants';
import jwt_decode from 'jwt-decode';
import {REACT_APP_BACKEND_URL} from '@env';
import NavigatorUnconfirmedScreen from './src/screens/NavigatorUnconfirmedScreen';
import {io} from 'socket.io-client';
import {
  disconnectSocket,
  getSocketInfo,
  initSocket,
} from './src/redux/slices/socket/socketSlice';
import {AuthStateType} from './src/redux/slices/auth/types';
import {SocketStateType} from './src/redux/slices/socket/types';

const AppScreens = () => {
  const dispatch: AppDispatch = useDispatch();
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const socketInfo: SocketStateType = useSelector(getSocketInfo);

  // Check tokens on each screen change
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
          //console.log(t);
          //console.log(t.data);
          t.data
            ? dispatch(authUpdateTokens(t.data))
            : dispatch(authSessionExpired());
        } catch (e) {
          //console.log('Unable to refresh tokens.');
          dispatch(authSessionExpired());
          dispatch(disconnectSocket());
        }
      }
    }
  };

  // Socket connection hook
  useEffect(() => {
    if (
      authInfo.authenticated &&
      authInfo.confirmed &&
      authInfo.refresh_token?.length
    ) {
      //console.log('Try to establish socket connection');
      dispatch(initSocket(authInfo.refresh_token));
    }
  }, [authInfo.confirmed]);

  useEffect(() => {
    //console.log(socket);
    if (socketInfo.socket?.connected === false) {
      //console.log('Before connect: ', socketInfo.socket);
      socketInfo.socket?.connect();
      //console.log('After connect: ', socketInfo.socket);
      socketInfo.socket.on('disconnect', () => {
        dispatch(authLogout());
      });
    }
  }, [socketInfo.socket]);

  return (
    <NavigationContainer onStateChange={onScreenChange}>
      <GalioProvider theme={appTheme}>
        <Block flex>
          {!authInfo.authenticated ? (
            <NavigatorUnauthenticatedScreen />
          ) : !authInfo.confirmed ? (
            <NavigatorUnconfirmedScreen />
          ) : (
            <NavigatorAuthenticatedScreen />
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
