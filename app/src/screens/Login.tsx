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
import {AuthStateType, getAuthInfo, getTokens} from '../redux/slices/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from './UnauthenticatedScreenNavigator';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

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
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}>
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
                    Welcome
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
                          placeholder="Username"
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
                          placeholder="Password"
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
                              Forgot Password?
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
                            Log in
                          </Text>
                        </Button>
                        <Button
                          color="secondary"
                          round
                          style={styles.formButton}
                          onPress={() => {
                            props.navigation.navigate('Register');
                          }}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={appTheme.COLORS.WHITE}>
                            Sign up
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
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
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: appTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: appTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
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
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default Login;
