import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {appTheme} from '../constants/';
import Onboarding from './Onboarding';
import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

const UnauthenticatedScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#F1F1F1',
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
          title: 'Sign up',
          headerTintColor: appTheme.COLORS.HEADER,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedScreenNavigator;
