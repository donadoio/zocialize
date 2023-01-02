import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {nowTheme} from '../constants/now';
import Onboarding from './Onboarding';
import Login from './Login';
import Register from './Register';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const UnauthenticatedScreenNavigator: React.FC = () => {
  return (
    <NavigationContainer>
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
            headerTintColor: nowTheme.COLORS.HEADER,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnauthenticatedScreenNavigator;
