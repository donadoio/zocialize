import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
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

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Register: React.FC = props => {
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
                    Get Started
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
                          placeholder="Email"
                          style={styles.inputs}
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
                          label="I agree to the terms and conditions."
                        />
                      </Block>
                      <Button color="primary" round style={styles.createButton}>
                        <Text
                          style={{fontFamily: 'montserrat-bold'}}
                          size={14}
                          color={appTheme.COLORS.WHITE}>
                          Register
                        </Text>
                      </Button>
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
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default Register;
