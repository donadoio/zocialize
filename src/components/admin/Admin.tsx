import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  VStack,
  Box,
  ListItem,
} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppStateType, ScreenType } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../../redux/slices/screenSlice";

const Admin = () => {
  const [revealed, setRevealed] = useState(false);
  const screen: ScreenType = useSelector((state: AppStateType): ScreenType => { return state.screen.current });
  const dispatch = useDispatch();
  const onPressSettings = () => {
    dispatch(setScreen('Settings'));
  };
  return (
    <>
    <Backdrop
      revealed={revealed}
      header={
        <AppBar
          title="Screen title"
          transparent
          leading={props => (
            <IconButton
              icon={props => (
                <Icon name={revealed ? "close" : "menu"} {...props} />
              )}
              onPress={() => setRevealed(prevState => !prevState)}
              {...props}
            />
          )}
        />
      }
      backLayer={
        <>
            <ListItem
              title="Dashboard"
              leading={<Icon name="home" size={24} />}
            />
            <ListItem
              title="Users"
              leading={<Icon name="person" size={24} />}
            />
            <ListItem
              title="Availability"
              leading={<Icon name="event" size={24} />}
            />
            <ListItem
              title="Settings"
              leading={<Icon name="settings" size={24} />}
              onPress={onPressSettings}
            />
            <ListItem
              title="Logout"
              leading={<Icon name="logout" size={24} />}
            />
        </>
      }>
          {(screen === 'Dashboard' && <Text>{"Hello pedro"}</Text>)}
          {(screen === 'Settings' && <Text>{"Hello Settings"}</Text>)}
    </Backdrop>
    </>
  );
};


export default Admin;

