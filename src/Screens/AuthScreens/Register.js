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

const Register = ({navigation}) => {
  var {replace} = navigation;
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [password, setPassword] = useState('');
  const [minPass, setMinPass] = useState('');
  const {colors} = useTheme();
  const [password_visible, setPasswordvisibility] = useState(false);

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
            fontSize: 20,
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
            fontSize: 16,
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
          placeholderTextColor={Color.transparantBlack}
          onChangeText={text => {
            setEmail(text);
            handleValidEmail(text);
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
            // setPassword(text),
            if (text.length < 6) {
              // console.log("min --------- ", text)
              setMinPass('set minimum character as 6');
              setPassword(text);
            } else {
              // console.log("max --------- ", text);
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
          secureTextEntry={!password_visible}
          value={password}
          onChangeText={text => {
            // setPassword(text),
            if (text.length < 6) {
              // console.log("min --------- ", text)
              setMinPass('set minimum character as 6');
              setPassword(text);
            } else {
              // console.log("max --------- ", text);
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
            color={Color.black}
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
              color: Color.black,
              textAlign: 'center',
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
        onPress={() => {}}
        disabled={!checked}
        style={{
          height: 50,
          backgroundColor: Color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 16, color: Color.white, textAlign: 'center'}}>
          Create Account
        </Text>
      </TouchableOpacity>
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
    borderColor: Color.cloudyGrey,
    backgroundColor: '#EAEAEF50',
    borderWidth: 1,
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
    fontFamily: Gilmer.SemiBold,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Register;
