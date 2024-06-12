import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import {base_image_url} from '../../Config/base_url';
import {Linking} from 'react-native';
import {Iconviewcomponent} from '../../Componens/Icontag';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {setUserData} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    try {
      const job_list = await fetchData.single_company(null, token);
      if (job_list) {
        setJobData(job_list?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const deleteCompany = async () => {
    try {
      Alert.alert(
        '',
        'Do You like to remove your account',
        [
          {
            text: 'No',
            onPress: async () => {},
          },
          {
            text: 'Yes',
            onPress: async () => {
              const delete_company = await fetchData.delete_company({}, token);
              console.log('delete_company', delete_company);
              if (delete_company) {
                navigation.replace('Auth');
                AsyncStorage.clear();
                dispatch(setUserData({}));
              }
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
                width={100}
                height={100}
                borderRadius={100}
                marginTop={-50}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                width={150}
                height={20}
                marginTop={10}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={20}
                marginTop={10}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={150}
                borderRadius={10}
                marginHorizontal={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={150}
                borderRadius={10}
                marginHorizontal={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              marginTop={10}
              borderRadius={10}
            />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{}}>
            {jobData?.banner == null ? (
              <Image
                source={Media?.user}
                style={{
                  width: '100%',
                  height: 80,
                  resizeMode: 'contain',
                  borderWidth: 1,
                  borderColor: Color.cloudyGrey,
                }}
              />
            ) : (
              <Image
                source={{
                  uri: base_image_url + jobData?.banner,
                }}
                style={{
                  width: '100%',
                  height: 80,
                  resizeMode: 'contain',
                }}
              />
            )}
            {jobData?.logo == null ? (
              <View
                style={{
                  padding: 10,
                  backgroundColor: Color.white,
                  position: 'absolute',
                  top: 40,
                  marginHorizontal: 10,
                  borderRadius: 100,
                }}>
                <Image
                  source={Media?.user}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'contain',
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: Color.cloudyGrey,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  padding: 10,
                  backgroundColor: Color.white,
                  position: 'absolute',
                  top: 40,
                  marginHorizontal: 10,
                  borderRadius: 100,
                }}>
                <Image
                  source={{uri: base_image_url + jobData?.logo}}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
              </View>
            )}
          </View>
          <View style={{marginTop: 30, padding: 10}}>
            {jobData?.name != null && (
              <Text
                style={{
                  fontSize: 18,
                  color: Color.black,
                  fontFamily: Gilmer.Bold,
                  marginTop: 10,
                }}>
                {jobData?.name}
              </Text>
            )}
            {jobData?.bio != null && (
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Bold,
                  marginVertical: 5,
                }}>
                {jobData?.bio}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  paddingVertical: 20,
                  backgroundColor: '#EFFAFF',
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}>
                <Iconviewcomponent
                  Icontag={'MaterialCommunityIcons'}
                  iconname={'home-city-outline'}
                  icon_size={36}
                  icon_color={Color.primary}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Gilmer.Bold,
                    }}>
                    {jobData?.origanization_type?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.secondary,
                      fontFamily: Gilmer.Medium,
                    }}
                    numberOfLines={2}>
                    origanization type
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  paddingVertical: 20,
                  backgroundColor: '#EFFAFF',
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'users'}
                  icon_size={36}
                  icon_color={Color.primary}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Gilmer.Bold,
                    }}>
                    {jobData?.team_size?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.secondary,
                      fontFamily: Gilmer.Medium,
                    }}
                    numberOfLines={2}>
                    Employees
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 5,
              }}>
              About Company
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                textAlign: 'justify',
                marginHorizontal: 10,
                marginVertical: 10,
                fontFamily: Gilmer.Medium,
                lineHeight: 25,
              }}>
              {jobData?.bio?.replace(/<[^>]+>/g, '')}
            </Text>
            <View style={{padding: 5}}>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  Phone
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  }}>
                  {jobData?.contactInfo?.phone}
                </Text>
              </View>
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  }}>
                  {jobData?.email}
                </Text>
              </View>
              {jobData?.website === null &&
              jobData?.website === 'null' &&
              jobData?.website === '' ? null : (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.cloudyGrey,
                      fontFamily: Gilmer.Medium,
                      paddingHorizontal: 5,
                    }}>
                    Website
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      textAlign: 'justify',
                      marginHorizontal: 10,
                      marginVertical: 10,
                      fontFamily: Gilmer.Medium,
                      lineHeight: 25,
                    }}>
                    {jobData?.website}
                  </Text>
                </View>
              )}
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  Address
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 25,
                  }}>
                  {jobData?.address}
                </Text>
              </View>
              {jobData?.social_links === null ? (
                <View />
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.cloudyGrey,
                      fontFamily: Gilmer.Medium,
                      paddingHorizontal: 5,
                    }}>
                    Follow Us
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      paddingVertical: 10,
                    }}>
                    {jobData?.social_links?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            Linking.openURL(item?.url);
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={item?.social_media}
                            icon_size={22}
                            icon_color={Color.blue}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: Color.white,
              padding: 10,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() => {
                deleteCompany();
              }}>
              <FIcon name="trash" size={20} color={Color.red} />
              <Text
                style={{
                  fontFamily: Gilmer.Bold,
                  fontSize: 16,
                  color: Color.blue,
                  marginHorizontal: 10,
                }}>
                Delete Your Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  numberCountryCode: {
    height: 48,
    color: Color.black,
    fontSize: 16,
    fontFamily: Gilmer.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});

export default ProfileScreen;
