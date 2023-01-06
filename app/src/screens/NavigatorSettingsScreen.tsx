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

export type RootStackParamList = {
  Settings: undefined;
  ChangeAvatar: undefined;
  ChangeProfileColor: undefined;
  ChangePassword: undefined;
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
          title: 'Change Your Avatar',
        }}
      />
      <Stack.Screen
        name="ChangeProfileColor"
        component={ChangeProfileColor}
        options={{
          title: 'Change Profile Color',
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigatorSettingsScreen;
