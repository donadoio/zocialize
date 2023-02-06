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
import {AppDispatch, RootState} from '../redux/store';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {confirmEmail} from '../redux/slices/auth/thunks';
import {
  AuthStateType,
  ConfirmEmailFulfilled,
  ValidationError,
} from '../redux/slices/auth/types';
import {getTokens} from '../redux/slices/auth/thunks';
import {authLogout} from '../redux/slices/auth/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from './NavigatorUnconfirmedScreen';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {disconnectSocket} from '../redux/slices/socket/socketSlice';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard: React.FC<any> = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

type StackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmEmail',
  'Unconfirmed'
>;

type Props = StackScreenProps & {
  authInfo: AuthStateType;
  onConfirmEmail: any;
};

const ConfirmEmail: React.FC<Props> = ({
  route,
  navigation,
  authInfo,
  onConfirmEmail,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const onPressConfirm = () => {
    if (verificationCode.length === 0) return;
    onConfirmEmail(verificationCode);
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
                    {t('confirm_email_title')}
                  </Text>
                </Block>

                <Block flex={1} middle>
                  <Block center flex={0.9}>
                    <Block center flex>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          marginBottom: 10,
                          paddingHorizontal: 10,
                        }}
                        muted>
                        {t('confirm_email_subtitle')}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          marginVertical: authInfo.error.length ? 10 : 0,
                          color: appTheme.COLORS.ERROR,
                        }}
                        muted>
                        {authInfo.error}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          marginVertical: authInfo.error.length ? 10 : 0,
                        }}
                        muted>
                        {`In development mode just submit "0000"`}
                      </Text>

                      <Block width={width * 0.8} style={{marginBottom: 5}}>
                        <Input
                          placeholder={t('verification_code')}
                          style={styles.inputs}
                          value={verificationCode}
                          onChange={(
                            e: NativeSyntheticEvent<TextInputChangeEventData>,
                          ) => {
                            setVerificationCode(e.nativeEvent.text);
                          }}
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
                              {t('send_again')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Button
                          color="primary"
                          round
                          style={styles.formButton}
                          onPress={onPressConfirm}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={appTheme.COLORS.WHITE}>
                            {t('confirm')}
                          </Text>
                        </Button>
                        <Button
                          color="secondary"
                          round
                          style={styles.formButton}
                          onPress={() => {
                            dispatch(authLogout());
                            dispatch(disconnectSocket());
                          }}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={appTheme.COLORS.WHITE}>
                            {t('logout')}
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
    paddingTop: 15,
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

const mapStateToProps = (state: RootState) => {
  return {
    authInfo: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    ConfirmEmailFulfilled | ValidationError,
    Action
  >,
) => {
  return {
    onConfirmEmail: (arg: string) => dispatch(confirmEmail(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);

//export default ConfirmEmail;
