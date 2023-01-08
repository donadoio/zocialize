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
} from 'react-native';
import {Block, Text, theme, Button as GaButton, NavBar} from 'galio-framework';

import {Button, Icon} from '../components';
import {Images, appTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import LinearGradient from 'react-native-linear-gradient';
import Post from '../components/Post';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ColorPicker from 'react-native-wheel-color-picker';
import {
  getBasicProfile,
  GetBasicProfileFulfilled,
  getBasicProfileInfo,
  ProfileStateType,
} from '../redux/slices/profileSlice';
import {connect, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './NavigatorSettingsScreen';
import {ThunkDispatch, Action} from '@reduxjs/toolkit';
import {ValidationError} from '../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings',
  'Settings'
>;

type Props = StackScreenProps & {
  profileInfo: ProfileStateType;
  onGetBasicProfile: any;
};

const Settings: React.FC<Props> = ({
  navigation,
  profileInfo,
  onGetBasicProfile,
}: Props) => {
  useEffect(() => {
    onGetBasicProfile('Settings');
  }, []);
  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);
  const {t} = useTranslation();
  return (
    <>
      <Block>
        <NavBar
          back={false}
          title={`${t('screen_titles.change_password')}`}
          style={styles.navbar}
          transparent={false}
          left={
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon
                name={'menu'}
                family="MaterialIcons"
                size={28}
                color={appTheme.COLORS.ICON}
              />
            </TouchableOpacity>
          }
          leftStyle={{paddingVertical: 12, flex: 0.2}}
          titleStyle={styles.navTitle}
        />
      </Block>
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
                    <Image
                      source={
                        profileInfo.avatar === 'default'
                          ? Images.DefaultAvatar
                          : Images.DefaultAvatar
                      }
                      style={styles.avatar}
                    />
                  </Block>
                  {/*
                          USERNAME
                */}
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
          {/*
              REST...
        */}
          <Block flex>
            <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
              <Block style={styles.rows}>
                <SettingListItem
                  navigation={navigation}
                  text={`${t('screen_titles.change_avatar')}`}
                  icon={'chevron-right'}
                  destination={'ChangeAvatar'}
                />
                <SettingListItem
                  navigation={navigation}
                  text={`${t('screen_titles.change_profile_color')}`}
                  icon={'chevron-right'}
                  destination={'ChangeProfileColor'}
                />
                <SettingListItem
                  navigation={navigation}
                  text={`${t('screen_titles.change_language')}`}
                  icon={'chevron-right'}
                  destination={'ChangeLanguage'}
                />
                <SettingListItem
                  navigation={navigation}
                  text={`${t('screen_titles.change_password')}`}
                  icon={'chevron-right'}
                  destination={'ChangePassword'}
                />
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </>
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
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  postOptions: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
    top: height * 0.1,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: appTheme.COLORS.HEADER,
  },
  submitButton: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  navTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 20,
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
    GetBasicProfileFulfilled | ValidationError,
    Action
  >,
) => {
  return {
    onGetBasicProfile: (arg: string) => dispatch(getBasicProfile(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const SettingListItem = ({navigation, text, icon, destination}) => {
  return (
    <TouchableOpacity
      style={{paddingVertical: 15}}
      onPress={() => navigation.navigate(destination)}>
      <Block row middle space="between" style={{paddingTop: 7}}>
        <Text
          style={{fontFamily: 'montserrat-regular'}}
          size={16}
          color={appTheme.COLORS.TEXT}>
          {text}
        </Text>
        <Icon
          name={icon}
          family="MaterialIcons"
          style={{paddingRight: 15}}
          size={16}
        />
      </Block>
    </TouchableOpacity>
  );
};
