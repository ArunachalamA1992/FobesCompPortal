import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gilmer } from '../../Global/FontFamily';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Componens/Icontag';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Login = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [password, setPassword] = useState('');
    const [password_visible, setPasswordvisibility] = useState(false);
    const [minPass, setMinPass] = useState('');




    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailValidError('Email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('Enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };


    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                    }}>
                    <Image
                        source={require('../../assets/logos/fobes.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text
                        style={{

                            fontSize: 20,
                            paddingHorizontal: 10,
                            color: Color.lightBlack,
                            fontFamily: Gilmer.Bold,
                            paddingVertical: 20,
                        }}>
                        Login !
                    </Text>
                    <View style={styles.NumberBoxConatiner}>
                        <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'mail'}
                            icon_size={22}
                            iconstyle={{ color: Color.transparantBlack }}
                        />
                        <TextInput
                            style={styles.numberTextBox}
                            placeholder="Email Address"
                            placeholderTextColor={Color.cloudyGrey}
                            value={email}
                            onChangeText={value => {
                                setEmail(value);
                                handleValidEmail(value);
                            }}
                            keyboardType="email-address"
                        />
                    </View>
                    {emailValidError ? (
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: Gilmer.Regular,
                                paddingVertical: 5,
                                fontSize: 14,
                                color: 'red',
                            }}>
                            {emailValidError}
                        </Text>
                    ) : null}

                    <View style={{ marginTop: 20 }}>
                        <View
                            style={[
                                styles.NumberBoxConatiner,
                                { marginVertical: 5, paddingHorizontal: 15 },
                            ]}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'lock'}
                                icon_size={22}
                                iconstyle={{ color: Color.transparantBlack }}
                            />
                            <TextInput
                                style={styles.numberTextBox}
                                placeholder="Password"
                                placeholderTextColor={Color.cloudyGrey}
                                secureTextEntry={!password_visible}
                                value={password}
                                keyboardType="name-phone-pad"
                                onChangeText={password => {
                                    if (password.length < 6) {
                                        setMinPass('set minimum character as 6');
                                        setPassword(password);
                                    } else {
                                        setPassword(password);
                                        setMinPass('');
                                    }
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordvisibility(!password_visible)}
                                style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'MaterialCommunityIcons'}
                                    iconname={!password_visible ? 'eye-off' : 'eye'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.transparantBlack }}
                                />
                            </TouchableOpacity>
                        </View>

                        {minPass != 'null' ? (
                            <Text
                                style={{
                                    width: '95%',
                                    paddingVertical: 5,
                                    fontSize: 14,
                                    color: 'red',
                                }}>
                                {minPass}
                            </Text>
                        ) : null}
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 0,
                        }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}
                        // onPress={() => {
                        //     navigation.navigate('ForgotPassword');
                        // }}
                        >
                            <Text
                                style={{
                                    fontFamily: Gilmer.Medium,
                                    fontSize: 14,
                                    color: Color.primary,
                                    textDecorationLine: 'underline',
                                }}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        // onPress={() => signIn()}
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 20,
                            borderRadius: 50,
                            backgroundColor: Color.primary,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.white,
                                textAlign: 'center',
                                fontFamily: Gilmer.SemiBold,
                            }}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ width: '100%', textAlign: 'center' }}>(or)</Text>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.cloudyGrey,
                                fontFamily: Gilmer.Medium,
                                textAlign: 'center',
                            }}>
                            Don’t have an account?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: Color.primary,
                                    fontFamily: Gilmer.Heavy,
                                    textAlign: 'center',
                                }}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </DismissKeyboard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.white,
    },
    NumberBoxConatiner: {
        display: 'flex',
        paddingHorizontal: 15,
        backgroundColor: '#EAEAEF50',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    numberCountryCode: {
        justifyContent: 'center',
        color: Color.black,
        fontSize: 14,
        alignItems: 'center',
        // paddingHorizontal: 15,//
    },
    numberTextBox: {
        flex: 1,
        height: 50,
        color: Color.black,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: Gilmer.Medium,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    placeTextBox: {
        flex: 1,
        display: 'flex',
        height: 50,
        color: Color.black,
        fontSize: 14,
        letterSpacing: 1,
        padding: 5,
        paddingTop: 5,
        paddingHorizontal: 10,
        fontFamily: Gilmer.Light,
        alignItems: 'flex-start',
    },
});

export default Login;
