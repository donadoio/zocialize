import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import Home from './Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {authLogout} from '../redux/slices/authSlice';
import {AppDispatch} from '../redux/store';

const Drawer = createDrawerNavigator();

const AuthenticatedScreenNavigator: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
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
    </Drawer.Navigator>
  );
};

export default AuthenticatedScreenNavigator;
