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
import {Dimensions, Image, StyleSheet} from 'react-native';
import {appTheme, Images} from '../constants';
import Profile from './Profile';
import {Block, Text} from 'galio-framework';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width} = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

const AuthenticatedScreenNavigator: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const DrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props}>
        <Block row={true} flex style={styles.menuLogoBlock}>
          <Block middle>
            <Image source={Images.Logo} style={styles.logo} />
          </Block>
          <Block flex center right>
            <TouchableOpacity
              onPress={() => {
                props.navigation.toggleDrawer();
              }}>
              <Icon
                color={appTheme.COLORS.WHITE}
                size={38}
                name={'arrow-left'}
              />
            </TouchableOpacity>
          </Block>
        </Block>
        <DrawerItemList {...props} />
        <DrawerItem
          inactiveTintColor={appTheme.COLORS.WHITE}
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
    <Icon color={appTheme.COLORS.WHITE} size={size} name={'logout'} />
  );
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: appTheme.COLORS.PRIMARY,
          width: width * 0.8,
        },
        drawerActiveTintColor: appTheme.COLORS.PRIMARY,
        drawerInactiveTintColor: appTheme.COLORS.WHITE,
        drawerActiveBackgroundColor: appTheme.COLORS.WHITE,
        drawerItemStyle: {},
        drawerLabelStyle: {},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? appTheme.COLORS.PRIMARY : appTheme.COLORS.WHITE}
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
              name="home"
              size={size}
              color={focused ? appTheme.COLORS.PRIMARY : appTheme.COLORS.WHITE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={Profile}
        options={{
          title: 'Friends',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="people"
              size={size}
              color={focused ? appTheme.COLORS.PRIMARY : appTheme.COLORS.WHITE}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuLogoBlock: {
    paddingVertical: 25,
    paddingHorizontal: 9,
  },
  logo: {
    width: 62,
    height: 38,
  },
  tempTitle: {
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 9,
  },
});

export default AuthenticatedScreenNavigator;
