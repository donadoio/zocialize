import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Button, Block, Text, theme, Input} from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme, Images} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BACKEND_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStateType, getAuthInfo} from '../redux/slices/authSlice';
import Post from '../components/Post';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const Home: React.FC<any> = props => {
  const dispatch = useDispatch();
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  const [postInput, setPostInput] = useState<string>('');
  const [imgPost, setImgPost] = useState<boolean>(false);

  return (
    <>
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.postingHeader}>
            <Block center middle>
              <Input
                right
                color="black"
                style={styles.postInput}
                placeholder="What do you want to share?"
                placeholderTextColor={'#8898AA'}
                iconContent={
                  <TouchableOpacity>
                    <Icon
                      size={16}
                      color={
                        postInput.length
                          ? theme.COLORS?.BLACK
                          : theme.COLORS.MUTED
                      }
                      name="send"
                      family="MaterialIcons"
                    />
                  </TouchableOpacity>
                }
                multiline={true}
                numberOfLines={3}
                value={postInput}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>,
                ) => {
                  setPostInput(e.nativeEvent.text);
                }}
              />
            </Block>
            <Block center middle row style={styles.postOptions}>
              <TouchableOpacity onPress={() => setImgPost(false)}>
                <Button shadowless style={[styles.tab, styles.divider]}>
                  <Block row middle>
                    <Icon
                      name="post-add"
                      family="MaterialIcons"
                      size={18}
                      style={{paddingRight: 8}}
                      color={
                        !imgPost
                          ? appTheme.COLORS.HEADER
                          : appTheme.COLORS.MUTED
                      }
                    />
                    <Text
                      size={16}
                      style={[
                        styles.tabTitle,
                        {
                          fontFamily: 'montserrat-regular',
                          color: !imgPost
                            ? appTheme.COLORS.HEADER
                            : appTheme.COLORS.MUTED,
                        },
                      ]}>
                      {'Default'}
                    </Text>
                  </Block>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImgPost(true)}>
                <Button shadowless style={styles.tab}>
                  <Block row middle>
                    <Icon
                      size={18}
                      name="image"
                      family="MaterialIcons"
                      style={{paddingRight: 8}}
                      color={
                        !imgPost
                          ? appTheme.COLORS.MUTED
                          : appTheme.COLORS.HEADER
                      }
                    />
                    <Text
                      size={16}
                      style={[
                        styles.tabTitle,
                        {
                          fontFamily: 'montserrat-regular',
                          color: !imgPost
                            ? appTheme.COLORS.MUTED
                            : appTheme.COLORS.HEADER,
                        },
                      ]}>
                      {'Image'}
                    </Text>
                  </Block>
                </Button>
              </TouchableOpacity>
            </Block>
          </View>
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
        </ScrollView>
      </Block>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  postsContainer: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  postInput: {
    height: 58,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: appTheme.COLORS.BORDER,
  },
  postOptions: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: appTheme.COLORS.HEADER,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  postingHeader: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
