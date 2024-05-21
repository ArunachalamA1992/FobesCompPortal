import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider, Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../../Global/Color';
import {FlatList} from 'react-native';
import {Gilmer} from '../../../Global/FontFamily';
import axios from 'axios';
import {job_data} from '../../../Config/Content';
import ItemCard from '../../../Componens/ItemCard';

const {height} = Dimensions.get('screen');
const SearchDataList = ({navigation}) => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SearchloadMore, setSearchLoadMore] = useState(false);
  const [Searchpage, setSearchPage] = useState(1);
  const [SearchendReached, setSearchEndReached] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState({
    data: [],
    visible: false,
  });
  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [recentSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);
  const [MostSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      // var data = `place=${searchLocation}&${type}=${searchJob}`;
      // console.log('data', data);
      // const job_list = await fetchData.filter_job(data, token);
      setJobData([]);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = async () => {
    try {
      // const data = `string=${searchJob}`;
      // const getData = await fetchData.add_search(data, token);
      setSearchModalVisible(false);
      getData();
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const propertySearch = async data => {
    setSearchJob(data);
    try {
      // const data = `search=${searchJob}&page=1&limit=10`;
      // const getData = await fetchData.search(data, token);
      setJobSuggestions({
        // data: getData?.data?.keyword,
        data: [],
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setLocationSuggestion({
        data: response?.data,
        visible: true,
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSearchModalVisible(true)}
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 50,
          marginBottom: 10,
          borderColor: Color.lightgrey,
          borderWidth: 1,
        }}>
        <FIcon name="search" size={18} color={Color.cloudyGrey} />
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Medium,
            marginHorizontal: 10,
          }}
          numberOfLines={1}>
          {`skills for `}
        </Text>
      </TouchableOpacity>
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
      <Modal
        visible={isSearchModalVisible}
        transparent={true}
        animationType={'fade'}>
        <Pressable
          style={{
            backgroundColor: Color.transparantBlack,
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
          onPress={() => setSearchModalVisible(false)}
        />
        <View style={styles.searchModal}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Gilmer.Medium,
              color: Color.cloudyGrey,
              marginVertical: 5,
            }}>
            Enter Skills ,designation
          </Text>
          <Searchbar
            placeholder="Search Jobs, Companies"
            placeholderTextColor={Color.grey}
            style={styles.searchView}
            value={'searchJob'}
            iconColor={Color.grey}
            inputStyle={{color: Color.black}}
            onChangeText={search => propertySearch(search)}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: Gilmer.Medium,
              color: Color.cloudyGrey,
              marginVertical: 5,
            }}>
            Enter Location
          </Text>
          <Searchbar
            placeholder="Search Location"
            placeholderTextColor={Color.grey}
            style={styles.searchView}
            value={'searchLocation'}
            icon={() => (
              <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
            )}
            iconColor={Color.grey}
            inputStyle={{color: Color.black}}
            onChangeText={search => {
              setSearchLocation(search);
              fetchSuggestions(search);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Button
              mode="contained"
              onPress={() => {
                setSearchModalVisible(false);
              }}
              style={styles.searchButton}>
              cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                handleSearch();
              }}
              style={styles.searchButton}>
              Search
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchDataList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginBottom: 10,
  },
  searchModal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    padding: 20,
  },
  searchButton: {
    marginVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: Color.primary,
  },
});
