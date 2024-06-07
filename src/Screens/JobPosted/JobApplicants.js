import React, {act, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Color from '../../Global/Color';
import {TabBar, TabView} from 'react-native-tab-view';
import {Gilmer} from '../../Global/FontFamily';
import {job_data} from '../../Config/Content';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Iconviewcomponent} from '../../Componens/Icontag';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import {Media} from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {base_image_url} from '../../Config/base_url';

const {height} = Dimensions.get('screen');
const Applies = ({
  categories_data,
  navigation,
  job_posting,
  getToggleJobs,
  GroupsData,
  token,
  loading,
  getActivityData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: 'All',
    value: 'all',
  });
  const [SelectedShorlist, setSelectedShorlist] = useState({});

  const job_profile_view = async id => {
    try {
      var data = {
        candidate_id: id,
      };
      const job_view = await fetchData.company_profile_view(data, token);
      if (job_view) {
        navigation.navigate('applicantdetails', {id: id});
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const candidate_result = async (groupId, id, status) => {
    try {
      let data = {
        applicant_id: id,
      };

      if (status === 'call') {
        data.is_called = 1;
      } else if (status === 'mail') {
        data.is_mailed = 1;
      } else if (status === 'group') {
        data.application_group_id = groupId;
      }
      const job_view = await fetchData.result_applicants(data, token);
      if (job_view) {
        common_fn.showToast(job_view?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const rejected_item = GroupsData.find(item => item?.name === 'Rejected');
  const rejected_id_find = rejected_item ? rejected_item.id : null;

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={100}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={100}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={100}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={100}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
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
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {categories_data?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginVertical: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                      borderRadius: 50,
                      padding: 10,
                      marginRight: 5,
                      paddingHorizontal: 10,
                      backgroundColor:
                        selectedCategory?.value == item?.value
                          ? Color.primary
                          : Color.white,
                    }}
                    onPress={() => {
                      getActivityData(item?.value);
                      setSelectedCategory(item);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          selectedCategory?.value == item?.value
                            ? Color.white
                            : Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <FlatList
            data={job_posting}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    job_profile_view(item?.id);
                  }}
                  style={styles.card}>
                  <View
                    style={{
                      backgroundColor: '#ECF8FF',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      padding: 15,
                    }}>
                    {item?.status != 'No Group' && (
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            item?.status == 'Shortlisted'
                              ? Color.green
                              : item?.status == 'Rejected'
                              ? Color.red
                              : Color.black,
                          fontFamily: Gilmer.Bold,
                          textAlign: 'right',
                          marginBottom: 10,
                        }}
                        numberOfLines={1}>
                        {item?.status}
                      </Text>
                    )}
                    <View style={styles.header}>
                      {item?.photo != null ? (
                        <Image
                          source={{uri: base_image_url + item?.photo}}
                          style={styles.image}
                        />
                      ) : (
                        <Image source={Media.user} style={styles.image} />
                      )}
                      <View style={styles.details}>
                        <Text style={styles.name} numberOfLines={1}>
                          {item?.name != null && `${item?.name} | `} {item?.job}
                        </Text>
                        <View style={styles.row}>
                          <Iconviewcomponent
                            Icontag={'MaterialIcons'}
                            iconname={'location-history'}
                            icon_size={18}
                            icon_color={Color.cloudyGrey}
                          />
                          <Text style={styles.location} numberOfLines={1}>
                            {item?.location}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <Iconviewcomponent
                              Icontag={'FontAwesome'}
                              iconname={'briefcase'}
                              icon_size={16}
                              icon_color={Color.cloudyGrey}
                            />
                            <Text style={styles.experience} numberOfLines={1}>
                              {item?.experience}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <Iconviewcomponent
                              Icontag={'Entypo'}
                              iconname={'wallet'}
                              icon_size={16}
                              icon_color={Color.cloudyGrey}
                            />
                            <Text style={styles.ctc} numberOfLines={1}>
                              {item?.expected_ctc}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.location} numberOfLines={1}>
                          Applied on{' '}
                          {moment(item?.applied_on).format('DD MMM YY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 15,
                      paddingBottom: 15,
                      borderLeftWidth: 1,
                      borderLeftColor: Color.lightgrey,
                      borderRightWidth: 1,
                      borderRightColor: Color.lightgrey,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.lightgrey,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={GroupsData}
                      value={SelectedShorlist}
                      labelField="name"
                      valueField="name"
                      placeholder={'Shorlist'}
                      searchPlaceholder="Search..."
                      onChange={group => {
                        setSelectedShorlist(group);
                        candidate_result(group?.id, item?.id, 'group');
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        candidate_result(rejected_id_find, item?.id, 'group');
                      }}>
                      <MCIcon
                        name="block-helper"
                        color={
                          item?.status == 'Rejected'
                            ? Color.lightgrey
                            : Color.red
                        }
                        size={30}
                        disabled={item?.status == 'Rejected'}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          getToggleJobs(item?.candidate_id);
                        }}
                        style={styles.iconContainer}>
                        <MCIcon
                          name={
                            item?.is_saved ? 'bookmark' : 'bookmark-outline'
                          }
                          size={20}
                          color={Color.black}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                          candidate_result(0, item?.id, 'mail');
                        }}>
                        <MCIcon
                          name="email"
                          color={Color.cloudyGrey}
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                          candidate_result(0, item?.id, 'call');
                        }}>
                        <Icon name="call" color={Color.cloudyGrey} size={20} />
                      </TouchableOpacity>
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
                    No {selectedCategory?.name} Applicants
                  </Text>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

const Shortlisted = ({navigation, job_posting, token, loading}) => {
  const job_profile_view = async id => {
    try {
      var data = {
        candidate_id: id,
      };
      const job_view = await fetchData.company_profile_view(data, token);
      if (job_view) {
        navigation.navigate('applicantdetails', {id: id});
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1}}>
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
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  job_profile_view(item?.id);
                }}
                style={styles.card}>
                <View
                  style={{
                    ...styles.header,
                    backgroundColor: '#ECF8FF',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: 15,
                  }}>
                  {item?.photo != null ? (
                    <Image
                      source={{uri: base_image_url + item?.photo}}
                      style={styles.image}
                    />
                  ) : (
                    <Image source={Media.user} style={styles.image} />
                  )}
                  <View style={styles.details}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item?.name != null && `${item?.name} | `} {item?.job}
                    </Text>
                    <View style={styles.row}>
                      <Iconviewcomponent
                        Icontag={'MaterialIcons'}
                        iconname={'location-history'}
                        icon_size={18}
                        icon_color={Color.cloudyGrey}
                      />
                      <Text style={styles.location} numberOfLines={1}>
                        {item?.location}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.row}>
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={'briefcase'}
                          icon_size={16}
                          icon_color={Color.cloudyGrey}
                        />
                        <Text style={styles.experience} numberOfLines={1}>
                          {item?.experience}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Iconviewcomponent
                          Icontag={'Entypo'}
                          iconname={'wallet'}
                          icon_size={16}
                          icon_color={Color.cloudyGrey}
                        />
                        <Text style={styles.ctc} numberOfLines={1}>
                          {item?.expected_ctc}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.location} numberOfLines={1}>
                      Applied on {moment(item?.created_at).format('DD MMM YY')}
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

const Rejected = ({navigation, job_posting, token, loading}) => {
  const job_profile_view = async id => {
    try {
      var data = {
        candidate_id: id,
      };
      const job_view = await fetchData.company_profile_view(data, token);
      if (job_view) {
        navigation.navigate('applicantdetails', {id: id});
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1}}>
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
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  job_profile_view(item?.id);
                }}
                style={styles.card}>
                <View
                  style={{
                    ...styles.header,
                    backgroundColor: '#ECF8FF',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: 15,
                  }}>
                  {item?.photo != null ? (
                    <Image
                      source={{uri: base_image_url + item?.photo}}
                      style={styles.image}
                    />
                  ) : (
                    <Image source={Media.user} style={styles.image} />
                  )}
                  <View style={styles.details}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item?.name != null && `${item?.name} | `} {item?.job}
                    </Text>
                    <View style={styles.row}>
                      <Iconviewcomponent
                        Icontag={'MaterialIcons'}
                        iconname={'location-history'}
                        icon_size={18}
                        icon_color={Color.cloudyGrey}
                      />
                      <Text style={styles.location} numberOfLines={1}>
                        {item?.location}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.row}>
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={'briefcase'}
                          icon_size={16}
                          icon_color={Color.cloudyGrey}
                        />
                        <Text style={styles.experience} numberOfLines={1}>
                          {item?.experience}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Iconviewcomponent
                          Icontag={'Entypo'}
                          iconname={'wallet'}
                          icon_size={16}
                          icon_color={Color.cloudyGrey}
                        />
                        <Text style={styles.ctc} numberOfLines={1}>
                          {item?.expected_ctc}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.location} numberOfLines={1}>
                      Applied on {moment(item?.created_at).format('DD MMM YY')}
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
                  No Rejection
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const JobApplicants = ({navigation, route}) => {
  const [id] = useState(route.params.id);
  const layout = useWindowDimensions();
  const [job_posting, setJobPosting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [GroupsData, setGroupsData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'applies', title: 'applies'},
    {key: 'shortlisted', title: 'shortlisted'},
    {key: 'rejected', title: 'rejected'},
  ]);

  const categories_data = [
    {
      id: 1,
      name: 'All',
      value: 'all',
    },
    {
      id: 2,
      name: 'New',
      value: 'new',
    },
    {
      id: 3,
      name: 'Not Viewed',
      value: 'not_viewed',
    },
    {
      id: 4,
      name: 'Pending Action',
      value: 'pending',
    },
  ];

  useEffect(() => {
    setLoading(true);
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [token, index]);

  const getData = async () => {
    try {
      var data =
        index == 0
          ? `job_id=${id}`
          : index == 1
          ? `name=Shortlisted&job_id=${id}`
          : `name=Rejected&job_id=${id}`;
      const company_job = await fetchData.job_applicants(data, token);
      console.log('company_job?.data', company_job?.data);
      setJobPosting(company_job?.data);
      const get_groups_data = await fetchData.get_groups('', token);
      setGroupsData(get_groups_data?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getActivityData = async type => {
    try {
      var activity_data =
        type == 'all' ? `job_id=${id}` : `job_id=${id}&created_at=${type}`;
      const activity = await fetchData.job_applicants(activity_data, token);
      setJobPosting(activity?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'applies':
        return (
          <Applies
            categories_data={categories_data}
            navigation={navigation}
            job_posting={job_posting}
            token={token}
            getToggleJobs={getToggleJobs}
            GroupsData={GroupsData}
            loading={loading}
            getActivityData={getActivityData}
          />
        );
      case 'shortlisted':
        return (
          <Shortlisted
            navigation={navigation}
            job_posting={job_posting}
            token={token}
            loading={loading}
          />
        );
      case 'rejected':
        return (
          <Rejected
            navigation={navigation}
            job_posting={job_posting}
            token={token}
            loading={loading}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled={false}
        onIndexChange={setIndex}
        style={{flex: 1}}
        initialLayout={{width: layout.width}}
        renderTabBar={props => {
          return (
            <TabBar
              {...props}
              style={{
                backgroundColor: Color.white,
                height: 50,
              }}
              labelStyle={{
                color: Color.primary,
                fontSize: 14,
                fontFamily: Gilmer.Medium,
                borderBottomColor: Color.primary,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}
              indicatorStyle={{backgroundColor: Color.primary, height: 5}}
              inactiveColor={Color.cloudyGrey}
            />
          );
        }}
      />
    </View>
  );
};

export default JobApplicants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  card: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 5,
  },
  name: {
    fontSize: 16,
    color: Color.black,
    fontFamily: Gilmer.Bold,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginRight: 10,
  },
  location: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  experience: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  ctc: {
    fontSize: 14,
    color: Color.black,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  skillsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderLeftWidth: 1,
    borderLeftColor: Color.lightgrey,
    borderRightWidth: 1,
    borderRightColor: Color.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  skillsTitle: {
    fontSize: 18,
    color: Color.black,
    fontFamily: Gilmer.Bold,
    marginBottom: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#EAEAEF50',
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
  skillText: {
    fontFamily: Gilmer.Medium,
    fontSize: 14,
    color: Color.black,
    textTransform: 'capitalize',
    paddingHorizontal: 15,
  },
  iconContainer: {
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    borderColor: Color.cloudyGrey,
  },
  dropdown: {
    height: 40,
    width: 120,
    borderColor: Color.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Color.black,
    fontFamily: Gilmer.Medium,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Color.primary,
    fontFamily: Gilmer.Medium,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.primary,
    textTransform: 'capitalize',
    fontFamily: Gilmer.Medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Color.primary,
    fontFamily: Gilmer.Medium,
  },
});
