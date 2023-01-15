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
import {authLogout} from '../redux/slices/auth/authSlice';
import {AppDispatch} from '../redux/store';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {appTheme, Images} from '../constants';
import Profile from './Profile';
import {Block, Text} from 'galio-framework';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigatorSettingsScreen from './NavigatorSettingsScreen';
import {disconnectSocket} from '../redux/slices/socketSlice';
import {useTranslation} from 'react-i18next';
import Friends from './Friends';
const {width} = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

const NavigatorAuthenticatedScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
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
          label={`${t('screen_titles.log_out')}`}
          onPress={() => {
            dispatch(authLogout());
            dispatch(disconnectSocket());
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
          title: `${t('screen_titles.home')}`,
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
          title: `${t('screen_titles.profile')}`,
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
        component={Friends}
        options={{
          title: `${t('screen_titles.friends')}`,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="people"
              size={size}
              color={focused ? appTheme.COLORS.PRIMARY : appTheme.COLORS.WHITE}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="NavigatorSettingsScreen"
        component={NavigatorSettingsScreen}
        options={{
          title: `${t('screen_titles.settings')}`,
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="settings"
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

export default NavigatorAuthenticatedScreen;
