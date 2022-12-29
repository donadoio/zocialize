import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
  } from 'react-native';
import { Button } from '@react-native-material/core';
import { useDispatch } from 'react-redux';
import getLogout from '../../redux/auth';

  const onPressLogout = () => {
    const dispatch = useDispatch();
    dispatch(getLogout());
    };

const Admin = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>mcgo Studio</Text>

            <TouchableOpacity
            onPress = {onPressLogout}>
                <Button title={"LOGOUT"} />
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

});

export default Admin;