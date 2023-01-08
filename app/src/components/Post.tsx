import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import Icon from './Icon';

import {appTheme, Images} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  onPress: () => any;
  author: string;
  title: string;
  image?: any;
  numOfLikes: number;
  liked: boolean;
  numOfDislikes: number;
  disliked: boolean;
  numOfComments: number;
};

const Post: React.FC<Props> = ({
  onPress,
  author,
  title,
  image,
  numOfLikes,
  liked,
  numOfDislikes,
  disliked,
  numOfComments,
}: Props) => {
  const imageStyles = [styles.fullImage];
  const cardContainer = [styles.card, styles.shadow];
  const imgContainer = [
    styles.imageContainer,
    styles.horizontalStyles,
    styles.shadow,
  ];

  return (
    <Block row={false} card flex style={cardContainer}>
      <TouchableOpacity>
        <Block row={true} flex style={styles.authorBlock}>
          <Block middle>
            <Image source={Images.DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block middle>
            <Text
              style={styles.authorTitle}
              size={14}
              color={appTheme.COLORS.SECONDARY}>
              {author}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>

      {image && (
        <TouchableWithoutFeedback onPress={onPress}>
          <Block middle flex style={imgContainer}>
            <Image resizeMode="cover" source={image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
      )}
      <Block flex space="between" style={styles.postDescription}>
        <Block flex>
          <Text
            style={styles.postTitle}
            size={14}
            color={appTheme.COLORS.SECONDARY}>
            {title}
          </Text>
        </Block>
        <Block>
          <Block row>
            <TouchableOpacity>
              <Block row style={styles.postButton}>
                <Icon
                  size={18}
                  name="thumb-up"
                  family="MaterialIcons"
                  style={{paddingRight: 8}}
                  color={
                    liked ? appTheme.COLORS.PRIMARY : appTheme.COLORS.HEADER
                  }
                />

                <Text
                  size={16}
                  style={[
                    styles.tabTitle,
                    {
                      color: liked
                        ? appTheme.COLORS.PRIMARY
                        : appTheme.COLORS.HEADER,
                    },
                  ]}>
                  {numOfLikes}
                </Text>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity>
              <Block row style={styles.postButton}>
                <Icon
                  size={18}
                  name="thumb-down"
                  family="MaterialIcons"
                  style={{paddingRight: 8}}
                  color={
                    disliked ? appTheme.COLORS.ACTIVE : appTheme.COLORS.HEADER
                  }
                />
                <Text
                  size={16}
                  style={[
                    styles.tabTitle,
                    {
                      color: disliked
                        ? appTheme.COLORS.ACTIVE
                        : appTheme.COLORS.HEADER,
                    },
                  ]}>
                  {numOfDislikes}
                </Text>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity>
              <Block row style={styles.postButton}>
                <Icon
                  size={18}
                  name="comment"
                  family="MaterialIcons"
                  style={{paddingRight: 8}}
                  color={appTheme.COLORS.HEADER}
                />
                <Text size={16} style={styles.tabTitle}>
                  {numOfComments}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  authorBlock: {
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
  authorTitle: {
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 9,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: appTheme.COLORS.HEADER,
    fontFamily: 'montserrat-regular',
  },
  postTitle: {
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  postDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  postButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default Post;
