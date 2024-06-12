import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, useTheme} from 'react-native-paper';
import {Iconviewcomponent} from '../../Componens/Icontag';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import OTPInput from '../../Componens/OTPInput';
import {useDispatch, useSelector} from 'react-redux';
import {setEmailVerify} from '../../Redux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVisible, setEmailVisible] = useState(false);
  const [token, setToken] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [minPass, setMinPass] = useState('');
  const [minconPass, setMinConPass] = useState('');
  const [password_visible, setPasswordvisibility] = useState(false);
  const [confirmPassword_visible, setConfirmPasswordVisibility] =
    useState(false);
  const [confirmPasserror, setConfirmPassError] = useState('');
  const [mailErrorMessage, setMailErrorMessage] = useState('');
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [error, setError] = useState(false);
  const emailVerify = useSelector(state => state.UserReducer.emailVerify);

  const chkOTPError = OTP => {
    let reg = /^[6-9][0-9]*$/;

    if (OTP.length === 0) {
      setError('Enter Your OTP Code');
    } else if (reg.test(OTP) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(OTP) === true) {
      setError('');
    }
  };

  const handleValidEmail = value => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'rediff.com',
      'mail.com',
      'zohocorp.com',
      'proton.me',
      'icloud.com',
    ];
    const emailDomain = value.split('@')[1];

    if (emailDomain && allowedDomains.includes(emailDomain.toLowerCase())) {
      setMailErrorMessage('This email domain is not allowed.');
    } else {
      setMailErrorMessage('');
    }
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPassError('Passwords do not match');
    } else {
      setConfirmPassError('');
    }
  };

  const handleEmailVerification = async () => {
    try {
      if (mailErrorMessage) {
        common_fn.showToast('Enter your valid Email address');
        return;
      }
      var data = {
        email: email,
      };
      const email_verification = await fetchData.verify_email(data, null);
      if (email_verification?.status == true) {
        common_fn.showToast(email_verification?.message);
        setEmailVisible(true);
        setToken(email_verification?.token);
      } else {
        common_fn.showToast(email_verification?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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

  const VerifyOTP = async () => {
    if (otpCode.length == 6) {
      var data = {otp: otpCode};
      const VerifyOTP = await fetchData.verify_email_otp(data, token);
      if (VerifyOTP?.message == 'Success') {
        common_fn.showToast(VerifyOTP?.message);
        setEmailVisible(false);
        dispatch(setEmailVerify(true));
      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
      }
    } else {
      common_fn.showToast(
        'Invalid OTP Code Please Enter Your 6 Digit OTP Code',
      );
    }
  };

  var opacityValue = !emailVerify ? 0.4 : 1;
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

      <View style={{marginVertical: 5}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Bold,
          }}>
          HR Name *
        </Text>
        <View style={styles.textContainer}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'person'}
            icon_size={22}
            iconstyle={{color: Color.transparantBlack}}
          />
          <TextInput
            style={[styles.numberTextBox, {paddingHorizontal: 10}]}
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

      <View style={{marginVertical: 5}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Bold,
          }}>
          Official Email Address *
        </Text>
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
            onChangeText={value => {
              setEmail(value);
              handleValidEmail(value);
            }}
            keyboardType="email-address"
          />

          {email && (
            <Button
              onPress={() => {
                handleEmailVerification();
              }}
              textColor={Color.primary}>
              Verify
            </Button>
          )}
        </View>
        {mailErrorMessage ? (
          <Text
            style={{
              color: 'red',
              marginTop: 5,
            }}>
            {mailErrorMessage}
          </Text>
        ) : null}
        <Modal transparent visible={emailVisible} animationType="slide">
          <Pressable
            style={{
              flex: 1,
              backgroundColor: Color.transparantBlack,
            }}
            onPress={() => {
              setEmailVerify(false);
            }}
          />
          <View
            style={{
              padding: 10,
              backgroundColor: Color.white,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Gilmer.Bold,
                color: Color.black,
                marginVertical: 10,
              }}>
              Enter Your OTP
            </Text>
            <OTPInput
              inputRef={inputRef}
              code={otpCode}
              setCode={setOTPCode}
              maximumLength={6}
              setIsPinReady={setIsPinReady}
              chkOTPError={chkOTPError}
            />
            <Button
              mode="contained"
              onPress={() => {
                VerifyOTP();
              }}
              style={{
                backgroundColor: Color.primary,
                marginHorizontal: 10,
                marginVertical: 20,
              }}
              textColor={Color.white}>
              Verify OTP
            </Button>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Gilmer.Bold,
                color: Color.red,
                textAlign: 'center',
              }}>
              {error}
            </Text>
          </View>
        </Modal>
      </View>

      <View style={{marginVertical: 5, opacity: opacityValue}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Bold,
          }}>
          Mobile Number *
        </Text>
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
            editable={emailVerify}
            onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      </View>

      <View style={{marginVertical: 5, opacity: opacityValue}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Bold,
          }}>
          Password *
        </Text>
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
            editable={emailVerify}
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
              iconstyle={{color: Color.transparantBlack}}
            />
          </TouchableOpacity>
        </View>
        {minPass != 'null' ? (
          <Text
            style={{
              width: '95%',
              paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {minPass}
          </Text>
        ) : null}
      </View>

      <View style={{marginVertical: 5, opacity: opacityValue}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Bold,
          }}>
          Confirm Password *
        </Text>
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
            editable={emailVerify}
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
            onPress={() =>
              setConfirmPasswordVisibility(!confirmPassword_visible)
            }
            style={styles.numberCountryCode}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={!confirmPassword_visible ? 'eye-off' : 'eye'}
              icon_size={22}
              iconstyle={{color: Color.transparantBlack}}
            />
          </TouchableOpacity>
        </View>
        {minconPass != 'null' ? (
          <Text
            style={{
              width: '95%',
              paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {minconPass}
          </Text>
        ) : null}
        {confirmPasserror != 'null' ? (
          <Text
            style={{
              width: '95%',
              paddingHorizontal: 5,
              fontSize: 14,
              color: 'red',
            }}>
            {confirmPasserror}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          // flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          opacity: opacityValue,
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            setChecked(!checked);
          }}
          disabled={!emailVerify}>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TermsandConditions');
            }}>
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
        disabled={!checked || !emailVerify}
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
