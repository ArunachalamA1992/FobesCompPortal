import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Color from '../Global/Color';
import {Gilmer} from '../Global/FontFamily';
import {Iconviewcomponent} from './Icontag';

const ItemCard = props => {
  const {item, navigation} = props;
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
              icon_size={25}
              icon_color={'#309CD2'}
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
                icon_size={20}
                icon_color={'#309CD2'}
              />
              <Text style={styles.experience} numberOfLines={1}>
                {item?.experience}
              </Text>
            </View>
            <View style={styles.row}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'wallet'}
                icon_size={20}
                icon_color={'#309CD2'}
              />
              <Text style={styles.ctc} numberOfLines={1}>
                {item?.expectedCTC}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} style={{marginLeft: 10}}>
          <Iconviewcomponent
            Icontag={'FontAwesome'}
            iconname={item?.is_saved ? 'bookmark' : 'bookmark-o'}
            icon_size={22}
            icon_color={item?.is_saved ? Color.primary : Color.Venus}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Key Skills</Text>
        {item?.skills?.length > 0 && (
          <View style={styles.skills}>
            {item?.skills?.map((skill, index) => {
              return (
                <View key={index} style={styles.skill}>
                  <Text style={styles.skillText}>{skill?.name}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    color: Color.cloudyGrey,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  experience: {
    fontSize: 14,
    color: Color.cloudyGrey,
    fontFamily: Gilmer.Medium,
    marginLeft: 5,
  },
  ctc: {
    fontSize: 14,
    color: Color.cloudyGrey,
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
});

export default ItemCard;
