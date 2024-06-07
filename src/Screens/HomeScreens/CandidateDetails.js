import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Color from '../../Global/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {Gilmer} from '../../Global/FontFamily';
import moment from 'moment';
import {Iconviewcomponent} from '../../Componens/Icontag';
import {TabBar, TabView} from 'react-native-tab-view';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import FIcon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import common_fn from '../../Config/common_fn';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {base_image_url} from '../../Config/base_url';

const {height} = Dimensions.get('window');
const AboutProfile = ({navigation, itemData}) => {
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>Key Skills</Text>
          {itemData?.candidate_skills?.length > 0 && (
            <View style={styles.skills}>
              {itemData?.candidate_skills?.map((skill, index) => {
                return (
                  <View key={index} style={styles.skill}>
                    <Text style={styles.skillText}>{skill?.name}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        {itemData?.candidate_experiences?.length > 0 && (
          <View>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Work Experience
            </Text>
            {itemData?.candidate_experiences?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 15,
                  }}>
                  <FIcon name="briefcase" size={20} color={Color.cloudyGrey} />
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 16,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {item?.designation}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      {item?.company}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Regular,
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      {moment(item?.start).format('MMM, YYYY')} -{' '}
                      {item?.end != null
                        ? moment(item?.end).format('MMM, YYYY')
                        : 'Present'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        {itemData?.candidate_educations?.length > 0 && (
          <View>
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 16,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              Education
            </Text>
            {itemData?.candidate_educations?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('Education', {item});
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 15,
                  }}>
                  <FIcon
                    name="graduation-cap"
                    size={20}
                    color={Color.cloudyGrey}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 14,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                      }}>
                      {item?.degree}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Medium,
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      {item?.institute_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Gilmer.Regular,
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textTransform: 'capitalize',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      {item?.year}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <View style={{}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 16,
              color: Color.black,
              textTransform: 'capitalize',
            }}>
            Contact Info
          </Text>
          {itemData?.phone != null && (
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Phone
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
                {itemData?.phone}
              </Text>
            </View>
          )}
          {itemData?.email != null && (
            <View style={{}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Email
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
                {itemData?.email}
              </Text>
            </View>
          )}
          {itemData?.website != null && (
            <View style={{}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Website
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
                {itemData?.website}
              </Text>
            </View>
          )}
          {itemData?.address != null && (
            <View style={{}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 5,
                }}>
                Address
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
                {itemData?.address}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 16,
              color: Color.black,
              textTransform: 'capitalize',
            }}>
            Other Details
          </Text>
          {itemData?.gender != null && (
            <View style={{flex: 1, marginVertical: 10}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Gender
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 20,
                  marginTop: 5,
                }}>
                {itemData?.gender}
              </Text>
            </View>
          )}
          {itemData?.marital_status != null && (
            <View style={{flex: 1, marginVertical: 10}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Marital Status
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 20,
                  marginTop: 5,
                }}>
                {itemData?.marital_status}
              </Text>
            </View>
          )}
          {itemData?.candidate_language?.length > 0 && (
            <View style={{flex: 1, marginVertical: 10}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Languages Known
              </Text>
              {itemData?.candidate_language?.map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      fontFamily: Gilmer.Medium,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 20,
                      marginTop: 5,
                    }}>
                    {item?.name},
                  </Text>
                );
              })}
            </View>
          )}
          {itemData?.birth_date != null && (
            <View style={{flex: 1, marginVertical: 10}}>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginHorizontal: 10,
                }}>
                Date of Birth
              </Text>
              <Text
                style={{
                  fontFamily: Gilmer.Medium,
                  fontSize: 14,
                  color: Color.black,
                  textTransform: 'capitalize',
                  marginHorizontal: 20,
                  marginTop: 5,
                }}>
                {moment(itemData?.birth_date).format('YYYY-MM-DD')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const Resume = ({itemData}) => {
  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadResume = async (file, name) => {
    let image_URL = [file];
    image_URL.map(itemImage => {
      let ext = getExtension(itemImage);
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      config({
        path: DownloadDir + '/Fobes' + '/' + name + ext,
      })
        .fetch('GET', itemImage)
        .then(async res => {
          common_fn.showToast(
            'Candidate Resume has been successfully downloaded.',
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      {itemData?.candidate_resume?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginVertical: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <Text
                  style={{
                    fontFamily: Gilmer.Bold,
                    fontSize: 16,
                    color: Color.black,
                    textTransform: 'capitalize',
                  }}>
                  {item?.name}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={async () => {
                try {
                  downloadResume(item?.file, itemData?.name);
                } catch (err) {}
              }}
              style={{
                backgroundColor: Color.white,
                marginHorizontal: 10,
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: Color.primary,
              }}
              icon={() => (
                <MCIcon name="download" size={20} color={Color.primary} />
              )}
              textColor={Color.primary}>
              Download Resume
            </Button>
          </View>
        );
      })}
    </View>
  );
};

const CandidateDetails = ({navigation, route}) => {
  const [id] = useState(route.params.id);
  const [itemData, setItemData] = useState({});
  const [SelectedShorlist, setSelectedShorlist] = useState({});
  const [GroupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const layout = useWindowDimensions();
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'about profile', title: 'about profile'},
    {key: 'resume', title: 'resume'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'about profile':
        return <AboutProfile navigation={navigation} itemData={itemData} />;
      case 'resume':
        return <Resume itemData={itemData} />;
    }
  };

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
      var data = `id=${id}`;
      const company_job = await fetchData.candidate_list(data, token);
      setItemData(company_job?.data?.[0]);
      const get_groups_data = await fetchData.get_groups('', token);
      setGroupsData(get_groups_data?.data);
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
    <View style={styles.container}>
      {loading ? (
        <View style={{padding: 10, backgroundColor: Color.white}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={100}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item style={{marginHorizontal: 10}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item style={{marginTop: 40}}>
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                style={{
                  marginHorizontal: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={180}
              height={20}
              borderRadius={100}
              marginTop={30}
            />
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={100}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item style={{marginHorizontal: 10}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={180}
              height={20}
              borderRadius={100}
              marginTop={30}
            />
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={100}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item style={{marginHorizontal: 10}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={180}
              height={20}
              borderRadius={100}
              marginTop={30}
            />
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={100}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item style={{marginHorizontal: 10}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item style={{marginTop: 40}}>
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                }}>
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                  marginRight={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.white}
                onPress={() => navigation.goBack()}
                style={{flex: 1}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.white,
                  fontFamily: Gilmer.Medium,
                  marginBottom: 5,
                }}>
                Applied on {moment(itemData?.created_at).format('DD MMM YY')}
              </Text>
            </View>
            <View style={styles.header}>
              {itemData?.photo != null ? (
                <Image
                  source={{uri: base_image_url + itemData?.photo}}
                  style={styles.image}
                />
              ) : (
                <Image source={Media.user} style={styles.image} />
              )}
              <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>
                  {itemData?.name != null && `${itemData?.name}  | `}{' '}
                  {itemData?.profession_name}
                </Text>
                <View style={styles.row}>
                  <Iconviewcomponent
                    Icontag={'MaterialIcons'}
                    iconname={'location-history'}
                    icon_size={18}
                    icon_color={Color.white}
                  />
                  <Text style={styles.location} numberOfLines={1}>
                    {itemData?.place}
                  </Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={'briefcase'}
                      icon_size={16}
                      icon_color={Color.white}
                    />
                    <Text style={styles.experience} numberOfLines={1}>
                      {itemData?.experience_name}
                    </Text>
                  </View>
                  {itemData?.expected_ctc != null && (
                    <View style={styles.row}>
                      <Iconviewcomponent
                        Icontag={'Entypo'}
                        iconname={'wallet'}
                        icon_size={16}
                        icon_color={Color.white}
                      />
                      <Text style={styles.ctc} numberOfLines={1}>
                        {itemData?.expected_ctc}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <ScrollView style={{}} nestedScrollEnabled>
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
                      backgroundColor: Color.primary,
                      height: 45,
                    }}
                    labelStyle={{
                      color: Color.white,
                      fontSize: 14,
                      fontFamily: Gilmer.Medium,
                      borderBottomColor: Color.primary,
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                      textAlign: 'center',
                      textTransform: 'capitalize',
                    }}
                    indicatorStyle={{backgroundColor: Color.white, height: 2}}
                    inactiveColor={'#8FB4FF'}
                  />
                );
              }}
            />
          </ScrollView>
          <View
            style={{
              backgroundColor: Color.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: 10,
              paddingBottom: 5,
              borderTopColor: Color.lightgrey,
              borderTopWidth: 1,
            }}>
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
                itemTextStyle={{color: Color.black}}
                data={GroupsData}
                value={SelectedShorlist}
                labelField="name"
                valueField="name"
                placeholder={'Shorlist'}
                searchPlaceholder="Search..."
                onChange={group => {
                  setSelectedShorlist(group);
                  candidate_result(group?.id, itemData?.id, 'group');
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  candidate_result(rejected_id_find, itemData?.id, 'group');
                }}>
                <MCIcon
                  name="block-helper"
                  color={
                    itemData?.status == 'Rejected' ? Color.lightgrey : Color.red
                  }
                  size={30}
                  disabled={itemData?.status == 'Rejected'}
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
                    getToggleJobs(itemData?.id);
                  }}
                  style={styles.iconContainer}>
                  <MCIcon
                    name={itemData?.is_saved ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={Color.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => {
                    candidate_result(0, itemData?.id, 'mail');
                  }}>
                  <MCIcon name="email" color={Color.cloudyGrey} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => {
                    candidate_result(0, itemData?.id, 'call');
                  }}>
                  <Icon name="call" color={Color.cloudyGrey} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CandidateDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  headerContainer: {
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // padding: 15,
    marginTop: 20,
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
    color: Color.white,
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
    color: Color.white,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  experience: {
    fontSize: 14,
    color: Color.white,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  ctc: {
    fontSize: 14,
    color: Color.white,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  skillsContainer: {
    paddingBottom: 15,
  },
  skillsTitle: {
    fontSize: 16,
    color: Color.black,
    fontFamily: Gilmer.Bold,
    marginBottom: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#F4F4F7',
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
