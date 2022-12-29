/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import {
   StyleSheet,
 } from 'react-native';
import { useDispatch, connect, useSelector } from 'react-redux'
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import { AppStateType, AuthStateType } from './redux/types';
 

 
 const Home: React.FC<{}> = () => {
   const dispatch = useDispatch();
   const authInfo: AuthStateType = useSelector((state: AppStateType) => state.auth);

   
 
   return (
      <>
        {(authInfo.authenticated === false) && <Login />}
        {(authInfo.authenticated === true) && <Admin />}
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