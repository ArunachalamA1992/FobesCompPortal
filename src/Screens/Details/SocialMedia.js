import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Button} from 'react-native-paper';
import {Gilmer} from '../../Global/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

const SocialMedia = ({navigation}) => {
  const [social_profile, setSocial_profile] = useState([
    {url: '', social_media: ''},
  ]);
  const [socialData] = useState([
    {
      id: 1,
      icon: 'facebook',
    },
    {
      id: 2,
      icon: 'instagram',
    },
    {
      id: 3,
      icon: 'linkedin-square',
    },
  ]);
  const renderItem = item => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FIcon name={item?.icon} size={18} color={Color.black} />
      </View>
    );
  };
  const addProfile = () => {
    const newId = social_profile.length + 1;
    setSocial_profile([
      ...social_profile,
      {id: newId, social_profile: '', selectedIcon: ''},
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View
          style={{
            width: '45%',
            height: 6,
            backgroundColor: Color.primary,
            borderRadius: 10,
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <View
          style={{
            width: '100%',
            height: 6,
            backgroundColor: Color.Whisper,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Add Accounts
          </Text>
          {social_profile?.map((profile, index) => (
            <View key={profile.id} style={{marginVertical: 10}}>
              <Dropdown
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={socialData}
                maxHeight={300}
                placeholder="icon"
                labelField="icon"
                value={profile.social_media}
                valueField="icon"
                onChange={item => {
                  const updatedProfiles = [...social_profile];
                  updatedProfiles[index].social_media = item?.icon;
                  setSocial_profile(updatedProfiles);
                }}
                renderItem={renderItem}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  borderRadius: 5,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <Icon name="link-sharp" size={30} color={Color.cloudyGrey} />
                <TextInput
                  placeholder=""
                  placeholderTextColor={Color.cloudyGrey}
                  value={'Web Url'}
                  onChangeText={text => {}}
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Gilmer.Medium,
                    marginHorizontal: 10,
                  }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={addProfile}
            style={{
              backgroundColor: '#00339A20',
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FIcon name="plus-circle" size={20} color={Color.primary} />
            <Text
              style={{
                fontFamily: Gilmer.Bold,
                fontSize: 16,
                color: Color.primary,
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              Add More Social Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            navigation.navigate('ContactDetails');
          } catch (err) {}
        }}
        style={{
          backgroundColor: Color.primary,
          marginHorizontal: 10,
        }}
        textColor={Color.white}>
        Next
      </Button>
    </View>
  );
};

export default SocialMedia;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: Color.lightgrey,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
  },
  placeholderStyle: {
    fontSize: 16,
    color: Color.cloudyGrey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Color.black,
  },
});
