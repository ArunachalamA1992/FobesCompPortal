//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Media } from '../../Global/Media';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';

// create a component
const OnboardOne = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 2, width: 300, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/images/onboard.png')} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
            </View>
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ width: '80%', fontSize: 20, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', padding: 10 }}>Selecting the Ideal Candidate Made Simple</Text>
                <Text style={{ width: '90%', fontSize: 14, paddingHorizontal: 10, color: Color.cloudyGrey, fontFamily: Gilmer.Regular, textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante sapien, finibus id mi ac, porttitor pretium risus.</Text>

                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10, marginVertical: 20
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Auth');
                        }}
                        style={{ width: '100%', height: 50, backgroundColor: Color.primary, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: Color.white }}>Get Started</Text>
                    </TouchableOpacity>
                    {/* <Button
                        title={'Next'}
                        titleStyle={{
                            fontSize: 12,
                            fontFamily: 'Poppins-SemiBold',
                        }}
                        buttonStyle={{
                            width: '100%',
                            height: 50,
                            backgroundColor: Color.primary,
                            borderRadius: 50,
                            alignItems: "center", justifyContent: "center"
                        }}
                        iconRight={true}
                        containerStyle={styles.buttonContainer}
                        onPress={() => {
                            navigation.navigate('ActionSelect');
                        }}
                    /> */}
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    buttonContainer: {
        marginHorizontal: 20,
        // width:"40%",
        alignItems: 'flex-end',
    },
});

//make this component available to the app
export default OnboardOne;
