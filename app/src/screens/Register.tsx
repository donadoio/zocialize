import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
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

import {Button, Icon, Input} from '../components/';
import {Images, appTheme} from '../constants/';
import Header from '../components/Header';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from './UnauthenticatedScreenNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthStateType,
  authUpdateErrorMsg,
  getAuthInfo,
  registerAccount,
} from '../redux/slices/authSlice';
import {AppDispatch} from '../redux/store';

const {width, height} = Dimensions.get('screen');

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Register',
  'Unauthenticated'
>;

const DismissKeyboard: React.FC<any> = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Register: React.FC<Props> = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const dispatch: AppDispatch = useDispatch();
  const onPressRegister: () => void = () => {
    console.log(`user: ${username}`);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirm password: ', confirmPassword);
    console.log('agreed to terms: ', agreeTerms);
    if (
      !username.length ||
      !password.length ||
      !email.length ||
      !confirmPassword.length
    )
      return;
    if (password !== confirmPassword) {
      dispatch(authUpdateErrorMsg('Passwords do not match.'));
      return;
    }
    if (agreeTerms === false) {
      dispatch(
        authUpdateErrorMsg('You must agree to the terms and conditions.'),
      );
      return;
    }
    dispatch(
      registerAccount({username: username, email: email, password: password}),
    );
  };
  return (
    <DismissKeyboard>
      <>
        <Block flex middle>
          <LinearGradient
            colors={[appTheme.COLORS.WHITE, '#010101']}
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
                    {t('get_started')}
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
                          placeholder={t('email')}
                          style={styles.inputs}
                          value={email}
                          onChange={(
                            e: NativeSyntheticEvent<TextInputChangeEventData>,
                          ) => {
                            setEmail(e.nativeEvent.text);
                          }}
                          iconContent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="email"
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

                      <Block width={width * 0.8} style={{marginBottom: 5}}>
                        <Input
                          placeholder={t('confirm_password')}
                          style={styles.inputs}
                          password={true}
                          value={confirmPassword}
                          onChange={(
                            e: NativeSyntheticEvent<TextInputChangeEventData>,
                          ) => {
                            setConfirmPassword(e.nativeEvent.text);
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

                      <Block
                        style={{
                          marginVertical: theme.SIZES.BASE,
                          marginLeft: 15,
                        }}
                        row
                        width={width * 0.75}>
                        <Checkbox
                          checkboxStyle={{
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: '#E3E3E3',
                          }}
                          color={appTheme.COLORS.PRIMARY}
                          labelStyle={{
                            color: appTheme.COLORS.HEADER,
                            fontFamily: 'montserrat-regular',
                          }}
                          label={t('agree_terms')}
                          initialValue={agreeTerms}
                          onChange={() => {
                            setAgreeTerms(!agreeTerms);
                          }}
                        />
                      </Block>
                      <Button
                        color="primary"
                        round
                        style={styles.registerButton}
                        onPress={onPressRegister}>
                        <Text
                          style={{fontFamily: 'montserrat-bold'}}
                          size={14}
                          color={appTheme.COLORS.WHITE}>
                          {t('register')}
                        </Text>
                      </Button>
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
  registerButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
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

export default Register;
