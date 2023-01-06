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
import {Block, Text, theme, Button as GaButton} from 'galio-framework';

import {Button, Icon} from '../components';
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

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangeAvatar',
  'Settings'
>;

type Props = StackScreenProps & {
  profileInfo: ProfileStateType;
  onGetBasicProfile: any;
};

const ChangeAvatar: React.FC<Props> = ({
  navigation,
  profileInfo,
  onGetBasicProfile,
}: Props) => {
  useEffect(() => {
    onGetBasicProfile('Settings');
  }, []);

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
                {/*
                          Change avatar/color options
                */}
                <Block row center middle style={styles.postOptions}>
                  <TouchableOpacity onPress={() => {}}>
                    <Button shadowless style={[styles.tab]}>
                      <Block row middle>
                        <Icon
                          name="camera-alt"
                          family="MaterialIcons"
                          size={18}
                          style={{paddingRight: 8}}
                          color={appTheme.COLORS.WHITE}
                        />
                        <Text
                          size={16}
                          style={[
                            styles.tabTitle,
                            {
                              fontFamily: 'montserrat-regular',
                              color: appTheme.COLORS.WHITE,
                            },
                          ]}>
                          {'Change'}
                        </Text>
                      </Block>
                    </Button>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Button shadowless style={styles.tab}>
                      <Block row middle>
                        <Icon
                          size={18}
                          name="delete"
                          family="MaterialIcons"
                          style={{paddingRight: 8}}
                          color={appTheme.COLORS.WHITE}
                        />
                        <Text
                          size={16}
                          style={[
                            styles.tabTitle,
                            {
                              fontFamily: 'montserrat-regular',
                              color: appTheme.COLORS.WHITE,
                            },
                          ]}>
                          {'Remove'}
                        </Text>
                      </Block>
                    </Button>
                  </TouchableOpacity>
                </Block>
              </Block>
            </Block>
          </LinearGradient>
        </Block>
        <Block />

        <Block flex style={styles.group}>
          <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
            <Block style={styles.rows}>
              <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
                <Block row middle space="between" style={{paddingTop: 7}}>
                  <Text
                    style={{fontFamily: 'montserrat-regular'}}
                    size={14}
                    color={appTheme.COLORS.TEXT}>
                    Manage Options
                  </Text>
                  <Icon
                    name="chevron-right"
                    family="MaterialIcons"
                    style={{paddingRight: 5}}
                  />
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>
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
  group: {
    paddingTop: theme.SIZES.BASE * 2,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);
