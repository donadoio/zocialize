import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';

import {Button, Icon, Input} from '../components/now';
import {Images, nowTheme} from '../constants/now';
import Header from '../components/now/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppDispatch} from '../redux/store';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Login: React.FC = props => {
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
                      <Block width={width * 0.8} style={{marginBottom: 5}}>
                        <Input
                          placeholder="Username"
                          style={styles.inputs}
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
                        <Button color="primary" round style={styles.formButton}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={nowTheme.COLORS.WHITE}>
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
                            color={nowTheme.COLORS.WHITE}>
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
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
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
    backgroundColor: nowTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(136, 152, 170, 0.3)',
    paddingVertical: 15,
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
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
