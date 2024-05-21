import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Color from '../../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {Gilmer} from '../../../Global/FontFamily';

const Congratulations = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Congratulations !</Text>
      <Text style={styles.p}>
        Congratulations on successfully posting the job! That's a significant
        towards finding the right candidate
      </Text>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('PromoteJob')}>
        <Text style={styles.PromoteJob}>Promote Job</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('JobPostTab')}>
        <Text style={styles.ViewJob}>View Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
  h1: {
    color: Color.black,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Gilmer.Medium,
  },
  p: {
    color: Color.cloudyGrey,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Gilmer.Regular,
    marginVertical: 15,
  },
  PromoteJob: {
    // width: 350,
    color: Color.white,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: Color.primary,
    fontFamily: Gilmer.Bold,
    padding: 15,
    borderRadius: 5,
  },
  ViewJob: {
    // width: 350,
    color: '#222222',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#E5EBF5',
    fontFamily: Gilmer.Bold,
    padding: 15,
    borderRadius: 5,
  },
  nextView: {
    marginVertical: 10,
  },
});
