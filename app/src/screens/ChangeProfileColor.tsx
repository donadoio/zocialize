import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {Block, Text, theme, Button as GaButton} from 'galio-framework';

import {Button} from '../components';
import {Images, appTheme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

import ColorPicker from 'react-native-wheel-color-picker';
import {connect} from 'react-redux';
import {RootState} from '../redux/store';
import {ThunkDispatch, Action} from '@reduxjs/toolkit';
import {ValidationError} from '../redux/slices/auth/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './NavigatorSettingsScreen';
import {changeProfileColor} from '../redux/slices/profile/thunks/changeProfileColor';
import {getBasicProfile} from '../redux/slices/profile/thunks/getBasicProfile';
import {
  ProfileStateType,
  GetBasicProfileFulfilled,
} from '../redux/slices/profile/types';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangeProfileColor',
  'Settings'
>;

type Props = StackScreenProps & {
  profileInfo: ProfileStateType;
  onGetBasicProfile: any;
  onChangeProfileColor: any;
};

const ChangeProfileColor: React.FC<Props> = ({
  navigation,
  profileInfo,
  onGetBasicProfile,
  onChangeProfileColor,
}: Props) => {
  useEffect(() => {
    onGetBasicProfile('ChangeProfileColor');
  }, []);
  const [chosenColor, setChosenColor] = useState('');
  const onPressSave = () => {
    onChangeProfileColor(chosenColor);
  };
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
                <Block row center middle style={styles.headerMsg}>
                  <Text
                    style={{
                      color:
                        profileInfo.error === 'failed'
                          ? appTheme.COLORS.ERROR
                          : appTheme.COLORS.SUCCESS,
                      fontWeight: 'bold',
                      fontSize: 19,
                      fontFamily: 'montserrat-bold',
                      marginTop: 15,
                      marginBottom: 30,
                      zIndex: 2,
                    }}>
                    {profileInfo.error === 'profile-color-failed'
                      ? 'Something went wrong...'
                      : profileInfo.error === 'profile-color-success'
                      ? 'New color saved.'
                      : ''}
                  </Text>
                </Block>
              </Block>
            </Block>
          </LinearGradient>
        </Block>
        <Block />
        {/*
              REST...
        */}

        <Block
          flex={0.4}
          style={{
            padding: theme.SIZES.BASE,
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <Block flex>
            <Block middle>
              <Text
                style={{
                  color: appTheme.COLORS.DEFAULT,
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2,
                }}>
                Choose your color and tap 'Save'
              </Text>
              <ColorPicker
                sliderHidden={true}
                thumbSize={40}
                noSnap={true}
                swatches={true}
                onColorChangeComplete={color => {
                  setChosenColor(color);
                }}
              />
            </Block>
          </Block>
        </Block>
        <Block middle center>
          <Button
            color="secondary"
            style={styles.submitButton}
            onPress={onPressSave}>
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
  headerMsg: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
    top: height * 0.1,
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
    onChangeProfileColor: (arg: string) => dispatch(changeProfileColor(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileColor);
