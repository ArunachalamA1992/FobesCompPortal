import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAsync, setUserData} from './Redux';
import {useDispatch} from 'react-redux';
import Color from './Global/Color';
import {Gilmer} from './Global/FontFamily';
import {Media} from './Global/Media';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const imageScale = new Animated.Value(0.1);

  useEffect(() => {
    try {
      const SplashLoad = setTimeout(() => {
        getloginData();
        getUserData();
      }, 3000);
      return () => clearInterval(SplashLoad);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getloginData = async () => {
    try {
      const userStateValue = await AsyncStorage.getItem('UserState');
      if (userStateValue) {
        const {onboardVisible} = JSON.parse(userStateValue);
        if (onboardVisible) {
          navigation.replace('OnboardOne');
          return;
        }
      }

      const userDataValue = await AsyncStorage.getItem('user_data');
      if (!userDataValue) {
        navigation.replace('Auth');
        return;
      }

      const userData = JSON.parse(userDataValue);
      dispatch(setUserData(userData));

      if (!userData.logo || !userData.name) {
        navigation.dispatch(StackActions.replace('basicDetails'));
        return;
      }

      if (
        !userData.industry_type?.name ||
        !userData.origanization_type?.name ||
        !userData.team_size?.name ||
        !userData.website
      ) {
        navigation.dispatch(StackActions.replace('profileDetails'));
        return;
      }

      if (!userData.social_links || userData.social_links.length === 0) {
        navigation.dispatch(StackActions.replace('SocialMedia'));
        return;
      }
      if (
        !userData.country ||
        !userData.district ||
        !userData.address ||
        !userData?.contactInfo?.phone ||
        !userData.email
      ) {
        navigation.dispatch(StackActions.replace('ContactDetails'));
        return;
      }

      const {token} = userData;
      if (!token) {
        navigation.replace('OnboardOne');
      } else {
        dispatch(setUserData(userData));
        navigation.replace('TabNavigator');
      }
    } catch (e) {
      console.log(e);
    }
  };

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri: Media.fobes_white_main}}
        style={[styles.image, {transform: [{scale: imageScale}]}]}
      />
      <Animated.Text
        style={[
          {fontSize: 20, color: Color.primary, fontFamily: Gilmer.SemiBold},
          {transform: [{scale: imageScale}]},
        ]}>
        Fobes
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
