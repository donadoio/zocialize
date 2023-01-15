import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, appTheme} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppDispatch} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getTokens} from '../redux/slices/auth/thunks';
import {AuthStateType} from '../redux/slices/auth/types';
import {getAuthInfo} from '../redux/slices/auth/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from './NavigatorUnauthenticatedScreen';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard: React.FC<any> = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login',
  'Unauthenticated'
>;

const Login: React.FC<Props> = ({route, navigation}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onPressLogin = () => {
    if (username.length === 0 || password.length === 0) return;
    dispatch(getTokens({username: username, password: password}));
  };
  return (
    <DismissKeyboard>
      <>
        <Block flex middle>
          <LinearGradient
            colors={[appTheme.COLORS.PRIMARY, '#010101']}
            style={styles.linearGradient}>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block middle style={styles.registerTitle}>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                    }}
                    color="#333"
                    size={24}>
                    {t('welcome')}
                  </Text>
                </Block>

                <Block flex={1} middle>
                  <Block center flex={0.9}>
                    <Block center flex>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          marginVertical: 10,
                          color: appTheme.COLORS.ERROR,
                        }}
                        muted>
                        {authInfo.error}
                      </Text>
                      <Block width={width * 0.8} style={{marginBottom: 5}}>
                        <Input
                          placeholder={t('username')}
                          style={styles.inputs}
                          value={username}
                          onChange={(
                            e: NativeSyntheticEvent<TextInputChangeEventData>,
                          ) => {
                            setUsername(e.nativeEvent.text);
                          }}
                          iconContent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="person"
                              family="MaterialIcons"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>

                      <Block width={width * 0.8} style={{marginBottom: 5}}>
                        <Input
                          placeholder={t('password')}
                          style={styles.inputs}
                          password={true}
                          value={password}
                          onChange={(
                            e: NativeSyntheticEvent<TextInputChangeEventData>,
                          ) => {
                            setPassword(e.nativeEvent.text);
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

                      <Block center>
                        <TouchableOpacity
                          onPress={() => {
                            console.log('HI!');
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'montserrat-regular',
                                marginVertical: 10,
                              }}
                              muted>
                              {t('forgot_password')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Button
                          color="primary"
                          round
                          style={styles.formButton}
                          onPress={onPressLogin}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={appTheme.COLORS.WHITE}>
                            {t('login')}
                          </Text>
                        </Button>
                        <Button
                          color="secondary"
                          round
                          style={styles.formButton}
                          onPress={() => {
                            navigation.navigate('Register');
                          }}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={appTheme.COLORS.WHITE}>
                            {t('signup')}
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </LinearGradient>
        </Block>
      </>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: appTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: appTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  registerTitle: {
    backgroundColor: appTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(136, 152, 170, 0.3)',
    paddingVertical: 15,
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
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  formButton: {
    width: width * 0.5,
    marginTop: 5,
    marginBottom: 10,
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

export default Login;
