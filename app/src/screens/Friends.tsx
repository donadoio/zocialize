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
import {
  Block,
  Text,
  theme,
  Input,
  Button as GaButton,
  NavBar,
} from 'galio-framework';

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

const Friends: React.FC<Props> = ({
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
      <Block
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: appTheme.COLORS.WHITE,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text size={16} style={styles.title}>
            {`Find new friends`}
          </Text>
          <Input
            right
            color="black"
            style={styles.searchPeopleInput}
            placeholder="Type a username"
            placeholderTextColor={'#8898AA'}
            iconContent={
              <TouchableOpacity>
                <Icon
                  size={16}
                  color={theme.COLORS.MUTED}
                  name="search"
                  family="MaterialIcons"
                />
              </TouchableOpacity>
            }
          />
          <Text size={16} style={styles.title}>
            {`Friend Requests`}
          </Text>
          <Block flex>
            <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
              <Block style={styles.rows}>
                <FriendRequestListItem
                  navigation={navigation}
                  name={'Friend'}
                />
                <FriendRequestListItem
                  navigation={navigation}
                  name={'Julian'}
                />
                <FriendRequestListItem navigation={navigation} name={'Steph'} />
              </Block>
            </Block>
          </Block>
          <Text size={16} style={styles.title}>
            {`${t('screen_titles.friends')}`}
          </Text>
          <Block flex>
            <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
              <Block style={styles.rows}>
                <FriendListItem navigation={navigation} name={'Friend'} />
                <FriendListItem navigation={navigation} name={'Julian'} />
                <FriendListItem navigation={navigation} name={'Steph'} />
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: appTheme.COLORS.HEADER,
    fontWeight: '700',
  },
  friendItemBlock: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 9,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    borderWidth: 0,
  },
  friendNameTitle: {
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 9,
  },
  searchPeopleInput: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: appTheme.COLORS.BORDER,
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends);

const FriendListItem = ({navigation, name}) => {
  return (
    <Block row space="between" style={{paddingVertical: 5}}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.friendItemBlock}>
          <Block middle>
            <Image source={Images.DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block middle>
            <Text
              style={styles.friendNameTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {name}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block row center middle>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon name={'block'} family="MaterialIcons" size={20} />
            <Text>Block</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'delete'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.ERROR}
            />
            <Text color={appTheme.COLORS.ERROR}>Delete</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

const FriendRequestListItem = ({navigation, name}) => {
  return (
    <Block row space="between" style={{paddingVertical: 5}}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.friendItemBlock}>
          <Block middle>
            <Image source={Images.DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block middle>
            <Text
              style={styles.friendNameTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {name}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block row center middle>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'check'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.SUCCESS}
            />
            <Text color={appTheme.COLORS.SUCCESS}>Accept</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'close'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.ERROR}
            />
            <Text color={appTheme.COLORS.ERROR}>Decline</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};
