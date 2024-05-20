import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';

const OnboardOne = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/onboard.png')}
        style={{
          width: 300,
          height: 300,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: 20,
          color: Color.black,
          fontFamily: Gilmer.Bold,
          textAlign: 'center',
          padding: 10,
        }}>
        Selecting the Ideal Candidate Made Simple
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          paddingHorizontal: 10,
          color: Color.cloudyGrey,
          fontFamily: Gilmer.Regular,
          textAlign: 'center',
          lineHeight: 25,
        }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante
        sapien, finibus id mi ac, porttitor pretium risus.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Auth');
          }}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: Color.primary,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.white,
              fontFamily: Gilmer.Bold,
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: 'flex-end',
  },
});

export default OnboardOne;
