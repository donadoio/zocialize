import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuIcon: React.FC = () => {
  const navigation = useNavigation();
  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  return <Icon.Button icon='menu' size={24} onPress={openDrawer} />;
}
export default MenuIcon;