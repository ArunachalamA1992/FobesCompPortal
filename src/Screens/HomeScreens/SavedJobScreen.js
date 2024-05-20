import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemCard from '../../Componens/ItemCard';
import {job_data} from '../../Config/Content';

const {height} = Dimensions.get('screen');
const SavedJobScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          marginVertical: 10,
          color: Color.black,
          fontFamily: Gilmer.Bold,
        }}>
        Profile ({job_data?.length})
      </Text>
      <FlatList
        data={job_data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <ItemCard item={item} navigation={navigation} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: height / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                width: '100%',
              }}>
              <MCIcon
                name="briefcase-variant-off"
                color={Color.primary}
                size={20}
              />
              <Text
                style={{
                  fontSize: 12,
                  padding: 5,
                  paddingHorizontal: 20,
                  marginStart: 5,
                  borderRadius: 5,
                  marginVertical: 10,
                  color: Color.primary,
                  fontFamily: Gilmer.Bold,
                }}>
                Job Not Found
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SavedJobScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});
