import React, {useState} from 'react';
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
import fetchData from '../Config/fetchData';
import common_fn from '../Config/common_fn';
import {useSelector} from 'react-redux';
import {Media} from '../Global/Media';
import {base_image_url} from '../Config/base_url';

const ItemCard = props => {
  const {item, navigation, getData} = props;
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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
  const job_profile_view = async id => {
    try {
      var data = {
        candidate_id: id,
      };
      const job_view = await fetchData.company_profile_view(data, token);
      if (job_view) {
        navigation.navigate('candidateDetails', {id: id});
      } else {
        common_fn.showToast(job_view?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const [visibleData, setVisibleData] = useState(
    item?.candidate_skills?.slice(0, 4),
  );
  const [showLoadMore, setShowLoadMore] = useState(
    item?.candidate_skills?.length > 4,
  );

  const loadMoreItems = () => {
    const newVisibleData = item?.candidate_skills?.slice(
      0,
      visibleData?.length + 8,
    );
    setVisibleData(newVisibleData);
    setShowLoadMore(newVisibleData.length < item?.candidate_skills?.length);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        job_profile_view(item?.candidate_id);
      }}
      style={styles.card}>
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
            {item?.name != null && `${item?.name}  | `} {item?.profession_name}
          </Text>
          <View style={styles.row}>
            <Iconviewcomponent
              Icontag={'MaterialIcons'}
              iconname={'location-history'}
              icon_size={25}
              icon_color={'#309CD2'}
            />
            <Text style={styles.location} numberOfLines={1}>
              {item?.place}
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
                {item?.expected_ctc}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            getToggleJobs(item?.candidate_id);
          }}
          style={{marginLeft: 10}}>
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
        {item?.candidate_skills?.length > 0 && (
          <View style={styles.skills}>
            {visibleData?.map((skill, index) => {
              return (
                <View key={index} style={styles.skill}>
                  <Text style={styles.skillText}>{skill?.name}</Text>
                </View>
              );
            })}
          </View>
        )}
        {showLoadMore && (
          <TouchableOpacity
            onPress={() => {
              loadMoreItems();
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Gilmer.Bold,
                color: Color.primary,
                marginHorizontal: 5,
                textDecorationLine: 'underline',
                textAlign: 'center',
              }}>
              See more
            </Text>
          </TouchableOpacity>
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
