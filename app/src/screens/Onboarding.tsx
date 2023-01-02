import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';

const {height, width} = Dimensions.get('screen');
import {Images, appTheme} from '../constants/';
import {HeaderHeight} from '../constants/utils';
import {useTranslation} from 'react-i18next';

const Onboarding: React.FC<{navigation: any}> = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <ImageBackground
          source={Images.Onboarding}
          style={{flex: 1, height: height, width, zIndex: 1}}
        />
        <Block space="between" style={styles.padded}>
          <Block>
            <Block middle>
              <Image
                source={Images.NowLogo}
                style={{
                  width: 115,
                  height: 124,
                  bottom: 200,
                  position: 'absolute',
                }}
              />
            </Block>
            <Block>
              <Block middle>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    bottom: 50,
                    position: 'absolute',
                    letterSpacing: 2,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                  }}
                  color="white"
                  size={44}>
                  {t('app_title')}
                </Text>
              </Block>
            </Block>
            <Block middle row>
              <Text
                color="white"
                size={16}
                style={{fontFamily: 'montserrat-regular'}}>
                {t('app_subtitle')}
              </Text>
            </Block>

            <Block
              row
              style={{
                marginTop: theme.SIZES.BASE * 2.5,
                marginBottom: theme.SIZES.BASE * 2,
              }}>
              <Button
                shadowless
                style={styles.button}
                color={appTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate('App')}>
                <Text
                  style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                  color={theme.COLORS.WHITE}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  GET STARTED
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom:
      Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});

export default Onboarding;

/*
import React, { useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
    StatusBar,
  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import materialTheme from '../constants/Theme';
import { Block, Button, Text, theme } from 'galio-framework';
import Images from '../constants/Images';
import { useTranslation } from 'react-i18next';
import { RootState } from '../redux/store';
import { AuthStateType, getAuthInfo } from '../redux/slices/authSlice';
const { height, width } = Dimensions.get('screen');

const Onboarding: React.FC<{ navigation: any }> = ({navigation}) => {
    const authInfo: AuthStateType = useSelector(getAuthInfo);
    const dispatch = useDispatch();
    const { t } = useTranslation();


    return (
        <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{  uri: Images.Onboarding }}
            style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60}>{t('app_title')}</Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>Social</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                {t('app_subtitle')}
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => {navigation.navigate('Login')}}>
                {t('get_started')}
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
    },
    padded: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      position: 'relative',
      bottom: theme.SIZES.BASE,
    },
    button: {
      width: width - theme.SIZES.BASE * 4,
      height: theme.SIZES.BASE * 3,
      shadowRadius: 0,
      shadowOpacity: 0,
    },
  });

  */
