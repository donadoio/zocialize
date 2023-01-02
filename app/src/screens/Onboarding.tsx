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

  
export default Onboarding;