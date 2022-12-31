import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import Components from './Components';
import Home from './Home';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  authLogout,
  authSessionExpired,
  AuthStateType,
  authUpdateTokens,
  getAuthInfo,
} from '../redux/slices/authSlice';
import {AppDispatch} from '../redux/store';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import {REACT_APP_BACKEND_URL} from '@env';
import jwt_decode from 'jwt-decode';

const Drawer = createDrawerNavigator();

const AuthenticatedScreenNavigator: React.FC = () => {
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
  const LogoutDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            dispatch(authLogout());
          }}
          icon={DrawerLogoutIcon}
        />
      </DrawerContentScrollView>
    );
  };
  const DrawerLogoutIcon = ({focused, color, size}) => (
    <Icon color={focused ? '#7cc' : '#ccc'} size={size} name={'logout'} />
  );
  return (
    <NavigationContainer onStateChange={onScreenChange}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <LogoutDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Icon name="home" size={size} color={focused ? '#7cc' : '#ccc'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Components"
          component={Components}
          options={{
            title: 'Components',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="table-chart"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="person"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedScreenNavigator;
