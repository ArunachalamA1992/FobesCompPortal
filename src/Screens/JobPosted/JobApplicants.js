import React from 'react';
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
import {job_data, job_posting} from '../../Config/Content';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Iconviewcomponent} from '../../Componens/Icontag';
import {Button} from 'react-native-paper';

const {height} = Dimensions.get('screen');
const Applies = ({categories_data, navigation}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {categories_data?.map((item, index) => {
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
                  paddingHorizontal: 10,
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
          })}
        </ScrollView>
      </View>
      <FlatList
        data={job_data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('applicantdetails', {item});
              }}
              style={styles.card}>
              <View style={styles.header}>
                <Image source={item?.image} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item?.name} | {item?.job_role}
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
                        {item?.expectedCTC}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.location} numberOfLines={1}>
                    Applied on {moment(item?.created_at).format('DD MMM YY')}
                  </Text>
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
                    <MCIcon
                      name="dots-horizontal"
                      color={Color.cloudyGrey}
                      size={20}
                    />
                  </View>
                  <View style={styles.iconContainer}>
                    <MCIcon name="email" color={Color.cloudyGrey} size={20} />
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon name="call" color={Color.cloudyGrey} size={20} />
                  </View>
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
    </View>
  );
};

const Shortlisted = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};

const Rejected = ({}) => {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};

const JobApplicants = ({navigation, route}) => {
  const layout = useWindowDimensions();

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
    },
    {
      id: 2,
      name: 'New',
    },
    {
      id: 3,
      name: 'Not Viewed',
    },
    {
      id: 4,
      name: 'Pending Action',
    },
  ];
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'applies':
        return (
          <Applies categories_data={categories_data} navigation={navigation} />
        );
      case 'shortlisted':
        return <Shortlisted />;
      case 'rejected':
        return <Rejected />;
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
    backgroundColor: '#ECF8FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
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
});
