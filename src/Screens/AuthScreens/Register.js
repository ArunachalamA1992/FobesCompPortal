import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {Iconviewcomponent} from '../../Componens/Icontag';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [minPass, setMinPass] = useState('');
  const [password_visible, setPasswordvisibility] = useState(false);
  const [confirmPassword_visible, setConfirmPasswordVisibility] =
    useState(false);
  const [error, setError] = useState('');

  const register = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      common_fn.showToast('All fields are required');
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      common_fn.showToast('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      common_fn.showToast('Passwords do not match');
      return;
    }

    const data = {
      name: username,
      email: email,
      phone: phone,
      password: password,
      role: 'company',
    };

    try {
      const registerData = await fetchData.register(data, null);
      if (registerData?.message === 'Registered Successfully') {
        common_fn.showToast(registerData?.message);
        navigation.navigate('Login');
      } else {
        common_fn.showToast(registerData?.message);
      }
    } catch (error) {
      console.error('Registration error', error);
      common_fn.showToast('Registration failed. Please try again.');
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

      <View style={styles.textContainer}>
        <Iconviewcomponent
          Icontag={'Ionicons'}
          iconname={'person'}
          icon_size={22}
          iconstyle={{color: Color.transparantBlack}}
        />
        <TextInput
          style={[styles.numberTextBox, {paddingHorizontal: 10}]}
          placeholder="HR Name"
          placeholderTextColor={Color.transparantBlack}
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
          keyboardType="name-phone-pad"
        />
      </View>

      <View style={styles.textContainer}>
        <Iconviewcomponent
          Icontag={'Ionicons'}
          iconname={'mail'}
          icon_size={22}
          iconstyle={{color: Color.transparantBlack}}
        />
        <TextInput
          style={[styles.numberTextBox, {paddingHorizontal: 10}]}
          placeholder="Official Email Address"
          value={email}
          placeholderTextColor={Color.transparantBlack}
          onChangeText={text => {
            setEmail(text);
            // handleValidEmail(text);
          }}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.textContainer}>
        <Iconviewcomponent
          Icontag={'Ionicons'}
          iconname={'call'}
          icon_size={22}
          iconstyle={{color: Color.transparantBlack}}
        />
        <TextInput
          style={[styles.numberTextBox, {paddingHorizontal: 10}]}
          placeholder="Mobile Number"
          placeholderTextColor={Color.transparantBlack}
          value={phone}
          onChangeText={text => setPhone(text)}
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>

      <View style={styles.textContainer}>
        <Iconviewcomponent
          Icontag={'MaterialCommunityIcons'}
          iconname={'lock'}
          icon_size={22}
          iconstyle={{color: Color.transparantBlack}}
        />
        <TextInput
          style={[styles.numberTextBox, {paddingHorizontal: 10}]}
          placeholder="Password"
          placeholderTextColor={Color.transparantBlack}
          secureTextEntry={!password_visible}
          value={password}
          onChangeText={text => {
            if (text.length < 6) {
              setMinPass('set minimum character as 6');
              setPassword(text);
            } else {
              setPassword(text);
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
            iconstyle={{color: Color.transparantBlack}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Iconviewcomponent
          Icontag={'MaterialCommunityIcons'}
          iconname={'lock'}
          icon_size={22}
          iconstyle={{color: Color.transparantBlack}}
        />
        <TextInput
          style={[styles.numberTextBox, {paddingHorizontal: 10}]}
          placeholder="Confirm Password"
          placeholderTextColor={Color.transparantBlack}
          secureTextEntry={!confirmPassword_visible}
          value={confirmPassword}
          onChangeText={text => {
            if (text.length < 6) {
              setMinPass('set minimum character as 6');
              setConfirmPassword(text);
            } else {
              setConfirmPassword(text);
              setMinPass('');
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
            iconstyle={{color: Color.transparantBlack}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          // flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
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
          <TouchableOpacity onPress={() => {}}>
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
        <Text style={{fontSize: 14, color: Color.white, textAlign: 'center'}}>
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
    marginVertical: 10,
    borderColor: '#EEEEEE',
    backgroundColor: '#EAEAEF50',
    borderWidth: 0.5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 15,
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
    fontFamily: Gilmer.SemiBold,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Register;
