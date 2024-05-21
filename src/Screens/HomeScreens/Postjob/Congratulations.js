import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../../../Global/Color'
import { useNavigation } from '@react-navigation/native';

const Congratulations = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Congratulations</Text>
      <Text style={styles.p}>Congratulations on successfully posting the job! That's a significant towards finding the right candidate</Text>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('Congratulations')}>
        <Text style={styles.PromoteJob}>Promote Job</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('Congratulations')}>
        <Text style={styles.ViewJob}>View Job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Congratulations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    h1: {
        color: Color.black,
        fontSize: 20,
      },
      p: {
        color: Color.black,
        fontSize: 14,
        textAlign: "center",
        marginVertical: 15,
      },
      PromoteJob: {
        width: 350,
        color: Color.white,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: Color.primary,
        paddingVertical: 10,
        marginHorizontal: 18,
        marginVertical: 10,
        borderRadius: 8,
      },
      ViewJob: {
        width: 350,
        color: Color.black,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: Color.lightgrey,
        paddingVertical: 10,
        marginHorizontal: 18,
        marginVertical: 10,
        borderRadius: 8,
      },
})