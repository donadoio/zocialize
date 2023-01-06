import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {appTheme} from '../constants';
import {useTranslation} from 'react-i18next';
import ConfirmEmail from './ConfirmEmail';

export type RootStackParamList = {
  ConfirmEmail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const UnconfirmedScreenNavigator: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      id="Unconfirmed"
      initialRouteName="ConfirmEmail"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#F1F1F1',
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          title: 'Onboarding',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnconfirmedScreenNavigator;
