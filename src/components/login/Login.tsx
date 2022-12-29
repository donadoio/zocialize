import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    NativeSyntheticEvent, 
    TextInputChangeEventData
  } from 'react-native';
import { Button } from '@react-native-material/core';
import { AppStateType, AuthStateType } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../redux/slices/authSlice';

const Login: React.FC<{}> = () => {
    const authInfo: AuthStateType = useSelector((state: AppStateType) => state.auth);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const dispatch = useDispatch();

    const onPressLogin = () => {
        if (username.length === 0 || password.length === 0) return;
        dispatch(getTokens({username: username, password: password}));
    };

    return (
        <>
        {(authInfo.loading === false) && <View style={styles.container}>
            <Text style={styles.title}>mcgo Studio</Text>
            <Text style={styles.errorMsg}>{authInfo.error}</Text>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="#938EA6"
                value={username}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { setUsername(e.nativeEvent.text); }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#938EA6"
                value={password}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { setPassword(e.nativeEvent.text); }}
                />
            </View>
            <TouchableOpacity>
                <Button title={"LOGIN"} onPress = {onPressLogin} />
            </TouchableOpacity>
        </View>}
        {(authInfo.loading === true) && <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
        </View>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5D1E94',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize:50,
        color:"#f1f1f1",
        marginBottom: 40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#6C24AA",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    errorMsg: {
        color: "red",
        fontWeight: "bold",
        marginBottom: 3,
    }

});

  
export default Login;