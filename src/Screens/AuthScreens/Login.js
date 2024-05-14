//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const Login = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Login</Text>

            <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={{ backgroundColor: 'red', padding: 10, paddingHorizontal: 30 }}>
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Login;
