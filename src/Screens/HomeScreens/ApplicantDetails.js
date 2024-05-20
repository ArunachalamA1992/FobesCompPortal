import React, {useState} from 'react';
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
          {itemData?.skills?.length > 0 && (
            <View style={styles.skills}>
              {itemData?.skills?.map((skill, index) => {
                return (
                  <View key={index} style={styles.skill}>
                    <Text style={styles.skillText}>{skill?.name}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
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
          {itemData?.candidate_education?.map((item, index) => {
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
              <View style={{flex: 1, marginHorizontal: 5}}></View>
            </View>
            <Button
              mode="contained"
              onPress={async () => {
                try {
                  downloadResume(item?.file, item?.name);
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

const CoverLetter = ({itemData}) => {
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      {itemData?.cover_letter != '' && itemData?.cover_letter != null ? (
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
            Cover Letter
          </Text>
          <Text
            style={{
              fontFamily: Gilmer.Medium,
              fontSize: 14,
              color: Color.black,
              textTransform: 'capitalize',
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              marginVertical: 10,
            }}>
            {itemData?.cover_letter}
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: height / 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            width: '100%',
          }}>
          <Image
            source={Media.empty_cover}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
        </View>
      )}
    </View>
  );
};
const ApplicantDetails = ({navigation, route}) => {
  const [itemData] = useState(route?.params?.item);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'about profile', title: 'about profile'},
    {key: 'resume', title: 'resume'},
    {key: 'cover letter', title: 'cover letter'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'about profile':
        return <AboutProfile navigation={navigation} itemData={itemData} />;
      case 'resume':
        return <Resume itemData={itemData} />;
      case 'cover letter':
        return <CoverLetter itemData={itemData} />;
    }
  };
  return (
    <View style={styles.container}>
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
          <Image source={itemData?.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={1}>
              {itemData?.name} | {itemData?.job_role}
            </Text>
            <View style={styles.row}>
              <Iconviewcomponent
                Icontag={'MaterialIcons'}
                iconname={'location-history'}
                icon_size={18}
                icon_color={Color.white}
              />
              <Text style={styles.location} numberOfLines={1}>
                {itemData?.location}
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
                  {itemData?.experience}
                </Text>
              </View>
              <View style={styles.row}>
                <Iconviewcomponent
                  Icontag={'Entypo'}
                  iconname={'wallet'}
                  icon_size={16}
                  icon_color={Color.white}
                />
                <Text style={styles.ctc} numberOfLines={1}>
                  {itemData?.expectedCTC}
                </Text>
              </View>
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
            borderWidth: 1.5,
            borderColor: Color.primary,
          }}
          textColor={Color.primary}>
          Shortlist
        </Button>
        <MCIcon name="block-helper" color={Color.red} size={30} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.iconContainer}>
            <MCIcon name="dots-horizontal" color={Color.cloudyGrey} size={20} />
          </View>
          <View style={styles.iconContainer}>
            <MCIcon name="email" color={Color.cloudyGrey} size={20} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="call" color={Color.cloudyGrey} size={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ApplicantDetails;

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
});
