import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {appTheme} from '../constants/';
import Onboarding from './Onboarding';
import Login from './Login';
import Register from './Register';
import {useTranslation} from 'react-i18next';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const UnauthenticatedScreenNavigator: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      id="Unauthenticated"
      initialRouteName="Login"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#F1F1F1',
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          title: 'Onboarding',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: t('signup'),
          headerTintColor: appTheme.COLORS.HEADER,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedScreenNavigator;
