import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import common_fn from '../../Config/common_fn';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {height} = Dimensions.get('window');
const RecentJobList = ({navigation}) => {
  const [job_posting, setJobPosting] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  useEffect(() => {
    setLoading(true);
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [token]);

  const getData = useCallback(async () => {
    try {
      const company_job = await fetchData.job_applicants(``, token);
      setJobPosting(company_job?.data);
    } catch (error) {
      console.log('error', error);
    }
  }, [token]);

  const getToggleJobs = async id => {
    try {
      var data = {candidate_id: id};
      const Saved_Jobs = await fetchData.save_candidated(data, token);
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
        getData();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
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
          data={job_posting}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const twentyFourHoursAgo = moment(
              new Date() - 24 * 60 * 60 * 1000,
            ).format('YYYY-MM-DD');
            const createdAt = moment(item?.created_at).format('YYYY-MM-DD');
            const newItem = twentyFourHoursAgo > createdAt;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  marginTop: 10,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  padding: 15,
                  margin: 5,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate('JobApplicants', {
                    id: item?.id,
                    title: item?.title,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Bold,
                      }}>
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Medium,
                        marginVertical: 5,
                      }}>
                      {`${item?.job_type}`}
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            common_fn.calculateRemainingTime(item?.deadline) ==
                            'Expired'
                              ? Color.red
                              : Color.lightBlack,
                          fontFamily: Gilmer.Medium,
                          marginVertical: 5,
                        }}>
                        {` ${common_fn.calculateRemainingTime(item?.deadline)}`}
                      </Text>
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.primary,
                          fontFamily: Gilmer.Bold,
                          marginRight: 10,
                        }}>
                        {item?.applicants} applied applicants
                      </Text>
                      {!newItem ? (
                        <View
                          style={{
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.red,
                              fontFamily: Gilmer.Medium,
                              backgroundColor: '#F94F4F10',
                              padding: 5,
                            }}>
                            New
                          </Text>
                        </View>
                      ) : (
                        <View style={{}} />
                      )}
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        getToggleJobs(item?.id);
                      }}
                      style={{flex: 1}}>
                      <MCIcon
                        name="bookmark-outline"
                        size={20}
                        color={Color.black}
                      />
                    </TouchableOpacity> */}
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Medium,
                      }}>
                      {moment(item?.created_at).format('DD MMM YY')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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

export default RecentJobList;
