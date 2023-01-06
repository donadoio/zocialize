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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './NavigatorUnauthenticatedScreen';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding',
  'Unauthenticated'
>;

const Onboarding: React.FC<Props> = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <LinearGradient
          colors={[appTheme.COLORS.PRIMARY, '#010101']}
          style={styles.linearGradient}>
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image
                  source={Images.AppLogo}
                  style={{
                    width: 200,
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
                    {t('get_started').toUpperCase()}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </LinearGradient>
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

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
});

export default Onboarding;
