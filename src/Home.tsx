/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import { store } from './redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@react-native-material/core";
import { login, logout, manual } from './redux/auth';
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
 

 
 const Home = () => {
   const authenticated = useSelector((state) => state.auth.authenticated);
   const dispatch = useDispatch();
 
   return (
      <>
        {!authenticated && <Login />}
        {authenticated && <Admin />}
      </>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default Home;
 