import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  View
} from 'react-native';
import { Button, Block, Text, theme, Input, DeckSwiper } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Images, materialTheme, products } from '../constants';
import { Product, Select, Switch } from '../components';
import Header from '../components/Header';
import axiosInstanceGenerator from '../util/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_BACKEND_URL } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStateType, getAuthInfo, getProfile, testDispatch } from '../redux/slices/authSlice';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Home: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const authInfo: AuthStateType = useSelector(getAuthInfo);

  const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        return value;
      }
      else {
        return "";
      }
    } catch(e) {
      // error reading value
      return "";
    }
  }

  const renderPhotoPost = () => {
      return (
        <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Product product={products[4]} full />
        <Product product={products[4]} full />
        <Product product={products[4]} full />
        </Block>
        </Block>
        </Block>
      );
  }
  
  const fetchProfile = async () => {
    let accessToken: string = await getData('@access');
    let refreshToken: string = await getData('@refresh');
    let axiosInstance = axiosInstanceGenerator(REACT_APP_BACKEND_URL, accessToken, refreshToken);
    let response = await axiosInstance.get('/user/getprofile');

    if (response.status === 200) {
      console.log("Data: ", response.data);
    }
  };

  return (
    <>
    <Button onPress={()=>{
      dispatch(getProfile({accessToken: authInfo.access_token}));
    }}>{"Fetch profile"}</Button>
    <Button onPress={()=>{
      dispatch(testDispatch());
    }}>{"Fetch profile"}</Button>
      <Block flex center>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
            {renderPhotoPost()}
        </ScrollView>
      </Block>
    </>
  );
}

export default Home;


const styles = StyleSheet.create({
  components: {
    width: width
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});
