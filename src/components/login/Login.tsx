import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
  } from 'react-native';
import { Button } from '@react-native-material/core';

  const onPressLogin = () => {
    // Do something about login operation
    };

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>mcgo Studio</Text>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="#938EA6"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#938EA6"
                />
            </View>
            <TouchableOpacity
            onPress = {onPressLogin}>
                <Button title={"LOGIN"} />
            </TouchableOpacity>
        </View>
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

});

export default Login;