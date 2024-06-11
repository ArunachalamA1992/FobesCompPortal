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
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import { StackActions, useNavigation } from '@react-navigation/native';
import common_fn from '../../Config/common_fn';
import { Iconviewcomponent } from '../../Componens/Icontag';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const setLogin = async () => {
    try {
      if (email && password) {
        const data = { email, password };
        const login = await fetchData.login_with_pass(data, null);

        if (login?.message === 'Login Successful') {
          const combinedData = {
            ...login.data,
            token: login.token,
          };
          await AsyncStorage.setItem('user_data', JSON.stringify(combinedData));

          if (!login.data.logo || !login.data.name) {
            navigation.dispatch(StackActions.replace('basicDetails'));
          } else if (
            !login.data.industry_type?.name ||
            !login.data.origanization_type?.name ||
            !login.data.team_size?.name ||
            !login.data.website
          ) {
            navigation.dispatch(StackActions.replace('profileDetails'));
          } else if (
            !login.data.social_links ||
            login.data.social_links.length === 0
          ) {
            navigation.dispatch(StackActions.replace('SocialMedia'));
          } else if (
            !login.data.country ||
            !login.data.district ||
            !login.data.address ||
            !login.data.contactInfo?.phone ||
            !login.data.email
          ) {
            navigation.dispatch(StackActions.replace('ContactDetails'));
          } else {
            navigation.dispatch(StackActions.replace('TabNavigator'));
          }
          common_fn.showToast(login.message);
        } else {
          common_fn.showToast(login?.message || 'Login failed');
        }
      } else {
        common_fn.showToast('Invalid Email or Password');
      }
    } catch (error) {
      console.log('error', error);
      common_fn.showToast('An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <Image
          source={require('../../assets/logos/fobes.png')}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            bottom: 30,
          }}>
          <Text
            style={{
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 16,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Regular,
            }}>
            Let’s login. You’ve been missed !
          </Text>
        </View>
      </View>
      <View style={{}}>
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
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setChecked(!checked);
              }}>
              <MCIcon
                name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
                size={20}
                color={Color.cloudyGrey}
              />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textAlign: 'center',
                  fontFamily: Gilmer.Medium,
                }}>
                Remember me
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
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
          onPress={() => {
            setLogin();
          }}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            borderRadius: 10,
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: Color.white,
            borderColor: Color.primary,
            borderWidth: 1,
          }}>
          <Icon name="person-outline" size={20} color={Color.primary} />
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              textAlign: 'center',
              fontFamily: Gilmer.SemiBold,
              marginHorizontal: 10,
            }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.white,
    justifyContent: 'center',
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
    paddingHorizontal: 15,
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
