import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Block, Text, theme, Button as GaButton} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, appTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import LinearGradient from 'react-native-linear-gradient';
import Post from '../components/Post';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ColorPicker from 'react-native-wheel-color-picker';
import {ThunkDispatch, Action} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import {ValidationError} from '../redux/slices/authSlice';
import {
  GetBasicProfileFulfilled,
  getBasicProfile,
  ProfileStateType,
} from '../redux/slices/profileSlice';
import {RootState} from '../redux/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './NavigatorSettingsScreen';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword',
  'Settings'
>;

type Props = StackScreenProps & {
  profileInfo: ProfileStateType;
  onGetBasicProfile: any;
};

const ChangePassword: React.FC<Props> = ({
  navigation,
  profileInfo,
  onGetBasicProfile,
}: Props) => {
  useEffect(() => {
    onGetBasicProfile('Settings');
  }, []);
  const t = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const onPressSubmit = () => {};

  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={0.4}>
          <LinearGradient
            colors={[
              profileInfo.profileColor === 'default'
                ? appTheme.COLORS.WHITE
                : profileInfo.profileColor,
              '#010101',
            ]}
            style={styles.linearGradient}>
            <Block flex>
              <Block
                style={{
                  position: 'absolute',
                  width: width,
                  zIndex: 5,
                  paddingHorizontal: 20,
                }}>
                {/*
                      AVATAR
              */}
                <Block middle style={{top: height * 0.08}}>
                  <Image source={Images.DefaultAvatar} style={styles.avatar} />
                </Block>
                <Block style={{top: height * 0.1}}>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26,
                      }}
                      color="#ffffff">
                      {profileInfo.username}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </LinearGradient>
        </Block>
        <Block />

        <Block middle center style={{paddingVertical: 15}}>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder={'Passwprd'}
              style={styles.inputs}
              password={true}
              value={oldPassword}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setOldPassword(e.nativeEvent.text);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="lock"
                  family="MaterialIcons"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder={'New password'}
              style={styles.inputs}
              password={true}
              value={newPassword}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setNewPassword(e.nativeEvent.text);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="lock"
                  family="MaterialIcons"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder={'Repeat new password'}
              style={styles.inputs}
              password={true}
              value={repeatNewPassword}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setRepeatNewPassword(e.nativeEvent.text);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="repeat"
                  family="MaterialIcons"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Button
            color="secondary"
            style={styles.submitButton}
            onPress={onPressSubmit}>
            <Text
              style={{fontFamily: 'montserrat-bold'}}
              size={14}
              color={appTheme.COLORS.WHITE}>
              {'Save'}
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width,
    height: height * 0.3,
    padding: 0,
    zIndex: 1,
  },
  inputIcons: {
    marginRight: 12,
    color: appTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  submitButton: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
const mapStateToProps = (state: RootState) => {
  return {
    profileInfo: state.profile,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    string | GetBasicProfileFulfilled | ValidationError,
    Action
  >,
) => {
  return {
    onGetBasicProfile: (arg: string) => dispatch(getBasicProfile(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
