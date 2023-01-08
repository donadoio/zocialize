import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {appTheme} from '../constants';
import Onboarding from './Onboarding';
import Login from './Login';
import Register from './Register';
import {useTranslation} from 'react-i18next';
import Settings from './Settings';
import ChangeAvatar from './ChangeAvatar';
import ChangeProfileColor from './ChangeProfileColor';
import ChangePassword from './ChangePassword';
import ChangeLanguage from './ChangeLanguage';

export type RootStackParamList = {
  Settings: undefined;
  ChangeAvatar: undefined;
  ChangeProfileColor: undefined;
  ChangePassword: undefined;
  ChangeLanguage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigatorSettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      id="Settings"
      initialRouteName="Settings"
      screenOptions={{
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeAvatar"
        component={ChangeAvatar}
        options={{
          title: `${t('screen_titles.change_avatar')}`,
        }}
      />
      <Stack.Screen
        name="ChangeProfileColor"
        component={ChangeProfileColor}
        options={{
          title: `${t('screen_titles.change_profile_color')}`,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: `${t('screen_titles.change_password')}`,
        }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{
          title: `${t('screen_titles.change_language')}`,
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigatorSettingsScreen;
