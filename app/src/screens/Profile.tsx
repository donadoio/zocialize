import React, {useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
} from 'react-native';
import {Block, Text, theme, Button as GaButton} from 'galio-framework';

import {Button} from '../components';
import {Images, appTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import LinearGradient from 'react-native-linear-gradient';
import Post from '../components/Post';
import {ThunkDispatch, Action} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import {ValidationError} from '../redux/slices/authSlice';
import {
  GetBasicProfileFulfilled,
  getBasicProfile,
  ProfileStateType,
} from '../redux/slices/profileSlice';
import {RootState} from '../redux/store';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

type Props = {
  navigation: any;
  profileInfo: ProfileStateType;
  onGetBasicProfile: any;
};

const Profile: React.FC<Props> = ({
  navigation,
  profileInfo,
  onGetBasicProfile,
}: Props) => {
  useEffect(() => {
    onGetBasicProfile('Profile');
  }, []);
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
                <Block middle style={{top: height * 0.08}}>
                  <Image source={Images.DefaultAvatar} style={styles.avatar} />
                </Block>
                <Block style={{top: height * 0.1}}>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26,
                      }}
                      color="#ffffff">
                      {profileInfo.username}
                    </Text>
                  </Block>
                </Block>
                <Block row space="around" style={{height: height * 0.32}}>
                  <Block middle>
                    <Text
                      size={18}
                      color="white"
                      style={{marginBottom: 4, fontFamily: 'montserrat-bold'}}>
                      2K
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      color="white">
                      Friends
                    </Text>
                  </Block>

                  <Block middle>
                    <Text
                      color="white"
                      size={18}
                      style={{marginBottom: 4, fontFamily: 'montserrat-bold'}}>
                      26
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      color="white">
                      Posts
                    </Text>
                  </Block>

                  <Block middle>
                    <Text
                      color="white"
                      size={18}
                      style={{marginBottom: 4, fontFamily: 'montserrat-bold'}}>
                      48
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      color="white">
                      Images
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </LinearGradient>
        </Block>
        <Block />
        <Block flex={0.4} style={{padding: theme.SIZES.BASE, marginTop: 10}}>
          <Block flex>
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2,
                }}>
                About me
              </Text>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  fontFamily: 'montserrat-regular',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#9A9A9A',
                  paddingHorizontal: 15,
                }}>
                An artist of considerable range, named Ryan — the name has taken
                by Melbourne has raised, Brooklyn-based Nick Murphy — writes,
                performs and records all of his own music.
              </Text>
            </Block>

            <View style={styles.postsContainer}>
              <Block flex>
                <Post
                  author={'Jimmy'}
                  title={'424242424'}
                  image={require('../assets/imgs/project15.jpg')}
                  onPress={() => {
                    console.log('HELLO!!');
                  }}
                  numOfLikes={3}
                  liked={true}
                  numOfDislikes={10}
                  disliked={true}
                  numOfComments={42}
                />
                <Post
                  author={'Jimmy'}
                  title={'424242424'}
                  onPress={() => {
                    console.log('HELLO!!');
                  }}
                  numOfLikes={3}
                  liked={true}
                  numOfDislikes={10}
                  disliked={true}
                  numOfComments={42}
                />
                <Post
                  author={'Jimmy'}
                  title={'424242424'}
                  onPress={() => {
                    console.log('HELLO!!');
                  }}
                  numOfLikes={3}
                  liked={true}
                  numOfDislikes={10}
                  disliked={true}
                  numOfComments={42}
                />
                <Post
                  author={'Jimmy'}
                  title={'424242424'}
                  onPress={() => {
                    console.log('HELLO!!');
                  }}
                  numOfLikes={3}
                  liked={true}
                  numOfDislikes={10}
                  disliked={true}
                  numOfComments={42}
                />
              </Block>
            </View>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: appTheme.SIZES.BASE * 3,
    height: appTheme.SIZES.BASE * 3,
    borderRadius: appTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width,
    height: height * 0.4,
    padding: 0,
    zIndex: 1,
  },
  postsContainer: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
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
    GetBasicProfileFulfilled | ValidationError,
    Action
  >,
) => {
  return {
    onGetBasicProfile: (arg: string) => dispatch(getBasicProfile(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
