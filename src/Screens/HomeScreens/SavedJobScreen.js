import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemCard from '../../Componens/ItemCard';
import {job_data} from '../../Config/Content';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {height} = Dimensions.get('screen');
const SavedJobScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, [token]);

  const getData = useCallback(async () => {
    try {
      const Saved_Jobs = await fetchData.list_bookmarks(null, token);
      if (Saved_Jobs) {
        setSavedJobs(Saved_Jobs?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      {savedJobs?.length != '' ? (
        <Text
          style={{
            fontSize: 18,
            marginVertical: 10,
            color: Color.black,
            fontFamily: Gilmer.Bold,
          }}>
          Profile ({savedJobs?.length})
        </Text>
      ) : null}
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <ItemCard item={item} navigation={navigation} getData={getData} />
            );
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
      )}
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
