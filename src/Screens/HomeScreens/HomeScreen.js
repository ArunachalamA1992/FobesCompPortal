import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FeIcon from 'react-native-vector-icons/Feather';
import {Media} from '../../Global/Media';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import moment from 'moment';
import common_fn from '../../Config/common_fn';
import {job_data, job_posting} from '../../Config/Content';

const All = ({job_data, navigation}) => {
  return (
    <FlatList
      data={job_data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('applicantdetails', {item});
            }}
            key={index}
            style={{
              marginTop: 10,
              borderColor: Color.lightgrey,
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              marginRight: 5,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Image
              source={item?.image}
              style={{width: 70, height: 70, resizeMode: 'contain'}}
            />
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                }}
                numberOfLines={1}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Regular,
                }}
                numberOfLines={1}>
                {item?.job_role}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                }}>
                {moment(item?.created_at).format('DD MMM YY')}
              </Text>
            </View>
            {item?.action == 'call' ? (
              <FeIcon
                name="phone-call"
                size={20}
                color={'#309CD2'}
                style={{padding: 10}}
              />
            ) : (
              <Icon
                name="mail"
                size={20}
                color={'#309CD2'}
                style={{padding: 10}}
              />
            )}
          </TouchableOpacity>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
const Called = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};
const Viewed = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};
const Mailed = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};
const Commented = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const [recentJobs] = useState([
    {
      id: 1,
      name: 'UX/UI Designer',
      job_type: 'Full Time',
      applicants: '2',
      created_at: '2024-05-18T12:06:03.566Z',
      end_date: '2024-05-30T12:06:03.566Z',
    },
    {
      id: 2,
      name: 'UX/UI Designer',
      job_type: 'Full Time',
      applicants: '2',
      created_at: '2024-05-18T12:06:03.566Z',
      end_date: '2024-05-30T12:06:03.566Z',
    },
    {
      id: 3,
      name: 'UX/UI Designer',
      job_type: 'Full Time',
      applicants: '2',
      created_at: '2024-05-18T12:06:03.566Z',
      end_date: '2024-05-30T12:06:03.566Z',
    },
    {
      id: 4,
      name: 'UX/UI Designer',
      job_type: 'Full Time',
      applicants: '2',
      created_at: '2024-05-18T12:06:03.566Z',
      end_date: '2024-05-30T12:06:03.566Z',
    },
    {
      id: 5,
      name: 'UX/UI Designer',
      job_type: 'Full Time',
      applicants: '2',
      created_at: '2024-05-18T12:06:03.566Z',
      end_date: '2024-05-30T12:06:03.566Z',
    },
  ]);
  const [jobsCategories] = useState([
    {
      id: 1,
      name: 'All Jobs',
    },
    {
      id: 2,
      name: 'Mobile Application',
    },
    {
      id: 3,
      name: 'Web Application',
    },
    {
      id: 4,
      name: 'UI/UX Desiners',
    },
    {
      id: 5,
      name: 'SEO',
    },
    {
      id: 6,
      name: 'Junior Devops Engineer',
    },
  ]);
  const [YourActivitiesData] = useState([
    {
      id: 1,
      name: 'Santhya',
      job_role: 'Senior Research Executive',
      created_at: '2024-05-18T12:06:03.566Z',
      image: Media.user,
      action: 'call',
    },
    {
      id: 2,
      name: 'Arjun',
      job_role: 'Senior Research Executive',
      created_at: '2024-05-18T12:06:03.566Z',
      image: Media.user,
      action: 'mail',
    },
    {
      id: 3,
      name: 'Santhya',
      job_role: 'Senior Research Executive',
      created_at: '2024-05-18T12:06:03.566Z',
      image: Media.user,
      action: 'call',
    },
  ]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: 'all'},
    {key: 'called', title: 'called'},
    {key: 'viewed', title: 'viewed'},
    {key: 'mailed', title: 'mailed'},
    {key: 'commented', title: 'commented'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return <All job_data={job_data} navigation={navigation} />;
      case 'called':
        return <Called />;
      case 'viewed':
        return <Viewed />;
      case 'mailed':
        return <Mailed />;
      case 'commented':
        return <Commented />;
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Color.primary,
          padding: 10,
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.white,
                fontFamily: Gilmer.Light,
              }}>
              {'Hello,'}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: Color.white,
                fontFamily: Gilmer.Medium,
              }}
              numberOfLines={1}>
              {'Demo'}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={async () => {
              try {
                navigation.navigate('');
              } catch (err) {}
            }}
            style={{
              backgroundColor: Color.white,
              marginHorizontal: 10,
            }}
            textColor={Color.black}>
            Post Job +
          </Button>
        </View>
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            backgroundColor: Color.white,
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            borderRadius: 50,
            width: '100%',
            height: 45,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate('SearchTab');
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
            }}
            numberOfLines={1}>
            {`Search candidates.. `}
          </Text>
          <Icon color={Color.black} name="search" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled>
        <View style={{padding: 10, flex: 1}}>
          <View
            style={{
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                }}>
                Recent Job Post
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RecentJob')}
                style={{padding: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.lightBlack,
                    fontFamily: Gilmer.Bold,
                    paddingHorizontal: 10,
                  }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={jobsCategories}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginVertical: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                      borderRadius: 50,
                      padding: 10,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Regular,
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={job_posting}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => {
                const twentyFourHoursAgo = moment(
                  new Date() - 24 * 60 * 60 * 1000,
                ).format('YYYY-MM-DD');
                const createdAt = moment(item?.created_at).format('YYYY-MM-DD');
                const newItem = twentyFourHoursAgo > createdAt;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('JobApplicants', {item});
                    }}
                    key={index}
                    style={{
                      marginVertical: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                      padding: 15,
                      margin: 5,
                      borderRadius: 10,
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
                          {item?.job_role}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Gilmer.Medium,
                            marginVertical: 5,
                          }}>
                          {`${
                            item?.job_type
                          } ${common_fn.calculateRemainingTime(
                            item?.end_date,
                          )}`}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
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
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Your Activities
            </Text>
          </View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            swipeEnabled={false}
            onIndexChange={setIndex}
            // style={{height: YourActivitiesData?.length * 100 + 50 + 10 + 50}}
            style={{flex: 1}}
            initialLayout={{width: layout.width}}
            renderTabBar={props => {
              return (
                <TabBar
                  {...props}
                  style={{
                    backgroundColor: Color.white,
                    height: 50,
                    marginVertical: 10,
                  }}
                  scrollEnabled={true}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default HomeScreen;
