import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {
  Block,
  Text,
  theme,
  Input,
  Button as GaButton,
  NavBar,
} from 'galio-framework';

import {Button, Icon} from '../components';
import {Images, appTheme} from '../constants';
import {connect, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {ThunkDispatch, Action} from '@reduxjs/toolkit';
import {useTranslation} from 'react-i18next';
import {clearSearchUsersResults} from '../redux/slices/friends/friendsSlice';
import {useIsFocused} from '@react-navigation/native';
import {ValidationError} from '../redux/slices/auth/types';
import {
  searchUsers,
  getFriends,
  getFriendRequests,
  addFriend,
  removeFriend,
  rejectRequest,
} from '../redux/slices/friends/thunks';
import {
  GetFriendsFulfilled,
  SearchUsersFulfilled,
  GetFriendRequestsFulfilled,
  AddFriendFulfilled,
  FriendsStateType,
} from '../redux/slices/friends/types';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const Friends: React.FC<Props> = ({
  navigation,
  onSearchUsers,
  onGetFriends,
  onGetFriendRequests,
  onAddFriend,
  onRemoveFriend,
  onRejectRequest,
  friendsState,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const isFocused: boolean = useIsFocused();
  const [searchNewFriendsQuery, setSearchNewFriendsQuery] =
    useState<string>('');
  // Mounting necessary data
  useEffect(() => {
    onGetFriends('Friends');
    onGetFriendRequests('Friends');
  }, []);
  // Other useEffects
  useEffect(() => {
    if (searchNewFriendsQuery.length > 3) {
      onSearchUsers(searchNewFriendsQuery);
    } else if (
      !searchNewFriendsQuery.length &&
      friendsState.userSearchResults.length
    ) {
      dispatch(clearSearchUsersResults());
    }
  }, [searchNewFriendsQuery]);
  // Check if screen is focused and there's something in results in order to clear it.
  useEffect(() => {
    if (isFocused === false && friendsState.userSearchResults.length)
      dispatch(clearSearchUsersResults());
    if (isFocused === false && searchNewFriendsQuery.length)
      setSearchNewFriendsQuery('');
  }, [isFocused]);
  const {t} = useTranslation();
  return (
    <>
      <Block
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: appTheme.COLORS.WHITE,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text size={16} style={styles.title}>
            {`Find new friends`}
          </Text>
          <Input
            right
            color="black"
            style={styles.searchPeopleInput}
            placeholder="Type a username"
            placeholderTextColor={'#8898AA'}
            iconContent={
              <TouchableOpacity>
                <Icon
                  size={16}
                  color={theme.COLORS.MUTED}
                  name="search"
                  family="MaterialIcons"
                />
              </TouchableOpacity>
            }
            value={searchNewFriendsQuery}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
              setSearchNewFriendsQuery(e.nativeEvent.text);
            }}
          />
          {friendsState.userSearchResults.length ? (
            <>
              <Text size={16} style={styles.title}>
                {`Results`}
              </Text>
              <Block flex>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                  <Block style={styles.rows}>
                    {friendsState.userSearchResults.map((element, id) => {
                      return (
                        <NewFriendSearchListItem
                          id={element.id}
                          username={element.username}
                          isFriend={false}
                          avatar={element.avatar}
                          onPress={() => {
                            onAddFriend(element.id);
                          }}
                          key={id}
                        />
                      );
                    })}
                  </Block>
                </Block>
              </Block>
            </>
          ) : null}
          {friendsState && !friendsState.userSearchResults.length && (
            <>
              {friendsState.friendRequests.length ? (
                <>
                  <Text size={16} style={styles.title}>
                    {`Friend Requests`}
                  </Text>
                  <Block flex>
                    <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                      <Block style={styles.rows}>
                        {friendsState.friendRequests.map((element, id) => {
                          return (
                            <FriendRequestListItem
                              id={element.id}
                              username={element.username}
                              avatar={element.avatar}
                              key={id}
                              onPressAccept={() => {
                                onAddFriend(element.id);
                              }}
                              onPressDecline={() => {
                                onRejectRequest(element.id);
                              }}
                            />
                          );
                        })}
                      </Block>
                    </Block>
                  </Block>
                </>
              ) : null}
              {friendsState.friends.length ? (
                <>
                  <Text size={16} style={styles.title}>
                    {`${t('screen_titles.friends')}`}
                  </Text>
                  <Block flex>
                    <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                      <Block style={styles.rows}>
                        {friendsState.friends.map((element, id) => {
                          return (
                            <FriendListItem
                              id={element.id}
                              username={element.username}
                              avatar={element.avatar}
                              key={id}
                              onPressDelete={() => {
                                onRemoveFriend(element.id);
                              }}
                            />
                          );
                        })}
                      </Block>
                    </Block>
                  </Block>
                </>
              ) : null}
            </>
          )}
        </ScrollView>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: appTheme.COLORS.HEADER,
    fontWeight: '700',
  },
  friendItemBlock: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 9,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    borderWidth: 0,
  },
  friendNameTitle: {
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 9,
  },
  searchPeopleInput: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: appTheme.COLORS.BORDER,
  },
});

////////////////////////////////////////////////////////////////
/////////////////////// Redux Mapping //////////////////////////
////////////////////////////////////////////////////////////////

const mapStateToProps = (state: RootState) => {
  console.log(state.friends);
  return {
    friendsState: state.friends,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    RootState,
    | GetFriendsFulfilled
    | SearchUsersFulfilled
    | ValidationError
    | GetFriendRequestsFulfilled
    | AddFriendFulfilled,
    Action
  >,
) => {
  return {
    onSearchUsers: (arg: string) => dispatch(searchUsers(arg)),
    onGetFriends: (arg: string) => dispatch(getFriends(arg)),
    onGetFriendRequests: (arg: string) => dispatch(getFriendRequests(arg)),
    onAddFriend: (arg: number) => dispatch(addFriend(arg)),
    onRemoveFriend: (arg: number) => dispatch(removeFriend(arg)),
    onRejectRequest: (arg: number) => dispatch(rejectRequest(arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);

////////////////////////////////////////////////////////////////
////////////////////////// Types ///////////////////////////////
////////////////////////////////////////////////////////////////

type Props = {
  navigation: any;
  friendsState: FriendsStateType;
  onSearchUsers: any;
  onGetFriends: any;
  onGetFriendRequests: any;
  onAddFriend: any;
  onRemoveFriend: any;
  onRejectRequest: any;
};

////////////////////////////////////////////////////////////////
//////////////////////// Components ////////////////////////////
////////////////////////////////////////////////////////////////

const NewFriendSearchListItem = ({id, username, isFriend, avatar, onPress}) => {
  return (
    <Block row space="between" style={{paddingVertical: 5}}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.friendItemBlock}>
          <Block middle>
            {avatar === 'default' ? (
              <Image source={Images.DefaultAvatar} style={styles.avatar} />
            ) : (
              <Image source={{uri: avatar}} style={styles.avatar} />
            )}
          </Block>
          <Block middle>
            <Text
              style={styles.friendNameTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {username}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block row center middle>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              style={{paddingRight: 5}}
              name={'block'}
              family="MaterialIcons"
              size={20}
            />
            <Text>Block</Text>
          </Block>
        </TouchableOpacity>
        {!isFriend ? (
          <TouchableOpacity onPress={onPress}>
            <Block row style={{paddingHorizontal: 10}}>
              <Icon
                color={appTheme.COLORS.SUCCESS}
                name={'person-add'}
                family="MaterialIcons"
                size={20}
                style={{paddingRight: 5}}
              />
              <Text color={appTheme.COLORS.SUCCESS}>Add friend</Text>
            </Block>
          </TouchableOpacity>
        ) : null}
      </Block>
    </Block>
  );
};

const FriendListItem = ({id, username, avatar, onPressDelete}) => {
  return (
    <Block row space="between" style={{paddingVertical: 5}}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.friendItemBlock}>
          <Block middle>
            <Image source={Images.DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block middle>
            <Text
              style={styles.friendNameTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {username}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block row center middle>
        <TouchableOpacity>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'block'}
              family="MaterialIcons"
              size={20}
              style={{paddingRight: 5}}
              color={appTheme.COLORS.MUTED}
            />
            <Text color={appTheme.COLORS.MUTED}>Block</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'delete'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.ERROR}
              style={{paddingRight: 5}}
            />
            <Text color={appTheme.COLORS.ERROR}>Delete</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

const FriendRequestListItem = ({
  id,
  username,
  avatar,
  onPressAccept,
  onPressDecline,
}) => {
  return (
    <Block row space="between" style={{paddingVertical: 5}}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.friendItemBlock}>
          <Block middle>
            <Image source={Images.DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block middle>
            <Text
              style={styles.friendNameTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {username}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <Block row center middle>
        <TouchableOpacity onPress={onPressAccept}>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'check'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.SUCCESS}
              style={{paddingRight: 5}}
            />
            <Text color={appTheme.COLORS.SUCCESS}>Accept</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDecline}>
          <Block row style={{paddingHorizontal: 10}}>
            <Icon
              name={'close'}
              family="MaterialIcons"
              size={20}
              color={appTheme.COLORS.ERROR}
              style={{paddingRight: 5}}
            />
            <Text color={appTheme.COLORS.ERROR}>Decline</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};
