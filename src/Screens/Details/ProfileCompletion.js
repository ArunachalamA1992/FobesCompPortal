import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../../Global/Color';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileCompletion = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#E5EBF5',
            width: 100,
            height: 100,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Icon name="checkmark" size={50} color={Color.primary} />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: Color.black,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: Color.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Congratulations,
          </Text>
          Your profile is 100% complete!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          You can post a job, purchase a plan for an upcoming job, and many
          more. Enjoy!
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            navigation.navigate('ProfileCompletion');
          } catch (err) {}
        }}
        style={{
          backgroundColor: Color.primary,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
        icon={() => <Icon name="arrow-forward" color={Color.white} size={18} />}
        textColor={Color.white}>
        Post Job
      </Button>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            navigation.navigate('TabNavigator');
          } catch (err) {}
        }}
        style={{
          backgroundColor: '#E5EBF5',
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
        textColor={Color.black}>
        View Dashboard
      </Button>
    </View>
  );
};

export default ProfileCompletion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});
