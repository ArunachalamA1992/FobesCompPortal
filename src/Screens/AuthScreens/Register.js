import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { Iconviewcomponent } from '../../Componens/Icontag';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [minPass, setMinPass] = useState('');
  const [minconPass, setMinConPass] = useState('');
  const [password_visible, setPasswordvisibility] = useState(false);
  const [confirmPassword_visible, setConfirmPasswordVisibility] = useState(false);
  const [confirmPasserror, setConfirmPassError] = useState('');


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


  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPassError('Passwords do not match');
    } else {
      setConfirmPassError('');
    }
  };


  const register = async () => {
    try {
      if (username != "" && email != "" && phone != "" && password != "" && confirmPassword != "") {

        var data = {
          name: username,
          email: email,
          phone: phone,
          password: password,
          role: 'company',
        };
        const register_data = await fetchData.register(data, null);
        console.log("Message =========== :", register_data);
        if (register_data?.message == 'Registered Successfully') {
          common_fn.showToast(register_data?.message);
          navigation.navigate('Login');
        } else {
          common_fn.showToast(register_data?.message);
        }
      }
      else {
        common_fn.showToast("Please fill mandatory fields")
      }
    } catch (error) {
      console.log('error', error);
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            paddingHorizontal: 10,
            color: Color.black,
            fontFamily: Gilmer.Heavy,
            marginTop: 10,
          }}>
          Register Now
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            paddingHorizontal: 10,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Medium,
            marginVertical: 10,
          }}>
          by creating a free account
        </Text>
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ textAlign: 'left', fontSize: 15, paddingHorizontal: 10, paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Gilmer.Bold }}>
          HR Name *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'person'}
            icon_size={22}
            iconstyle={{ color: Color.transparantBlack }}
          />
          <TextInput
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Enter HR Name"
            placeholderTextColor={Color.transparantBlack}
            value={username}
            onChangeText={text => {
              setUsername(text);
            }}
            keyboardType="name-phone-pad"
          />
        </View>
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ textAlign: 'left', fontSize: 15, paddingHorizontal: 10, paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Gilmer.Bold }}>
          Official Email Address *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'mail'}
            icon_size={22}
            iconstyle={{ color: Color.transparantBlack }}
          />
          <TextInput
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Official Email Address"
            value={email}
            placeholderTextColor={Color.transparantBlack}
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
              fontSize: 14,
              color: 'red',
            }}>
            {emailValidError}
          </Text>
        ) : null}
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ textAlign: 'left', fontSize: 15, paddingHorizontal: 10, paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Gilmer.Bold }}>
          Mobile Number *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'call'}
            icon_size={22}
            iconstyle={{ color: Color.transparantBlack }}
          />
          <TextInput
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Mobile Number"
            placeholderTextColor={Color.transparantBlack}
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ textAlign: 'left', fontSize: 15, paddingHorizontal: 10, paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Gilmer.Bold }}>
          Password *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'MaterialCommunityIcons'}
            iconname={'lock'}
            icon_size={22}
            iconstyle={{ color: Color.transparantBlack }}
          />
          <TextInput
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Password"
            placeholderTextColor={Color.transparantBlack}
            secureTextEntry={!password_visible}
            value={password}
            onChangeText={password => {
              if (password.length < 6) {
                setMinPass('set minimum character as 6');
                setPassword(password);
              } else {
                setPassword(password);
                setMinPass('');
              }
            }}
            keyboardType="name-phone-pad"
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
              width: '95%', paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {minPass}
          </Text>
        ) : null}
      </View>




      <View style={{ marginVertical: 0 }}>
        <Text style={{ textAlign: 'left', fontSize: 15, paddingHorizontal: 10, paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Gilmer.Bold }}>
          Confirm Password *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'MaterialCommunityIcons'}
            iconname={'lock'}
            icon_size={22}
            iconstyle={{ color: Color.transparantBlack }}
          />
          <TextInput
            style={[styles.numberTextBox, { paddingHorizontal: 10 }]}
            placeholder="Confirm Password"
            placeholderTextColor={Color.transparantBlack}
            secureTextEntry={!confirmPassword_visible}
            value={confirmPassword}
            onChangeText={confirmPassword => {
              if (confirmPassword.length < 6) {
                setMinConPass('set minimum character as 6');
                handleConfirmPasswordChange(confirmPassword);
              } else {
                handleConfirmPasswordChange(confirmPassword);
                setMinConPass('');
              }
            }}
            keyboardType="name-phone-pad"
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisibility(!confirmPassword_visible)}
            style={styles.numberCountryCode}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={!confirmPassword_visible ? 'eye-off' : 'eye'}
              icon_size={22}
              iconstyle={{ color: Color.transparantBlack }}
            />
          </TouchableOpacity>
        </View>
        {minconPass != 'null' ? (
          <Text
            style={{
              width: '95%', paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {minconPass}</Text>
        ) : null}
        {confirmPasserror != 'null' ? (
          <Text
            style={{
              width: '95%', paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {confirmPasserror}</Text>
        ) : null}
      </View>


      <View
        style={{
          // flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            setChecked(!checked);
          }}>
          <MCIcon
            name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
            size={24}
            color={checked ? Color.primary : Color.cloudyGrey}
          />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              textAlign: 'center',
              fontFamily: Gilmer.Medium,
            }}>
            I've read and agree with{' '}
          </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('TermsandConditions'); }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.primary,
                fontFamily: Gilmer.Medium,
                textDecorationLine: 'underline',
              }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          register();
        }}
        disabled={!checked}
        style={{
          height: 45,
          backgroundColor: checked ? Color.primary : Color.lightgrey,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginVertical: 20,
        }}>
        <Text style={{ fontSize: 14, color: Color.white, textAlign: 'center' }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Color.cloudyGrey,
            textAlign: 'center',
            fontFamily: Gilmer.Medium,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              textDecorationLine: 'underline',
              paddingHorizontal: 5,
            }}>
            Login
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
  textContainer: {
    borderColor: '#EEEEEE',
    backgroundColor: '#EAEAEF50',
    borderWidth: 0.5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 7,
  },
  numberTextBox: {
    flex: 1,
    display: 'flex',
    height: 50,
    // borderLeftColor: Color.Venus,
    // borderLeftWidth: 1,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    fontFamily: Gilmer.Regular,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Register;
