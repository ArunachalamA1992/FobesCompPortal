import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../../Global/Color';
import {Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import common_fn from '../../../Config/common_fn';
import {Gilmer} from '../../../Global/FontFamily';

const SearchScreen = ({navigation}) => {
  const [searchJob, setSearchJob] = useState('');
  const [type, setType] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [TopCompany, setTopCompany] = useState([]);
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
  const propertySearch = async data => {
    setSearchJob(data);
    try {
      // const data = `search=${searchJob}&page=1&limit=10`;
      // const getData = await fetchData.search(data);
      setJobSuggestions({
        // data: getData?.data?.keyword,
        data: [],
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const getSearchData = async () => {
    try {
      // if (searchJob != '' && searchLocation != '') {
      // const data = `string=${searchJob}`;
      // const getData = await fetchData.add_search(data, token);
      navigation.navigate('SearchDataList', {
        location: searchLocation,
        jobs: searchJob,
        type: type,
      });
      // } else {
      //   common_fn.showToast('Please select the Job and Location');
      // }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Job Title, Skills"
        placeholderTextColor={Color.grey}
        style={styles.searchView}
        value={searchJob}
        iconColor={Color.grey}
        inputStyle={{color: Color.black}}
        onChangeText={search => propertySearch(search)}
      />
      <Searchbar
        placeholder="Search Location"
        placeholderTextColor={Color.grey}
        style={styles.searchView}
        value={searchLocation}
        icon={() => (
          <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
        )}
        iconColor={Color.grey}
        inputStyle={{color: Color.black}}
        onChangeText={search => {}}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 40,
          marginVertical: 10,
          backgroundColor: Color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
        onPress={() => {
          getSearchData();
        }}>
        <Text style={{fontSize: 16, color: Color.white}}>Search</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
            }}>
            Popular Tag
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSearchJob('');
              setSearchLocation('');
            }}>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.primary,
                textTransform: 'capitalize',
                marginHorizontal: 5,
              }}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {recentSearch.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#9DCBE250',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: '#9DCBE2',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: Gilmer.Bold,
                    fontSize: 14,
                    color: Color.black,
                    textTransform: 'capitalize',
                    marginHorizontal: 5,
                    marginVertical: 10,
                  }}>
                  {item?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            fontSize: 18,
            color: Color.black,
            textTransform: 'capitalize',
            marginHorizontal: 5,
          }}>
          Most Popular Searches
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {MostSearch.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#9DCBE250',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: '#9DCBE2',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: Gilmer.Bold,
                    fontSize: 14,
                    color: Color.black,
                    textTransform: 'capitalize',
                    marginHorizontal: 5,
                    marginVertical: 10,
                  }}>
                  {item?.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginTop: 10,
  },
});
