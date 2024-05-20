import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import FIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';

const Profile = ({navigation}) => {
  const [FromdatePickerVisible, setFromDatePickerVisible] = useState(false);
  const [yearCompletionData, setYearCompletionData] = useState([]);

  const showFromDatePicker = () => {
    setFromDatePickerVisible(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisible(false);
  };

  const handleFromConfirm = date => {
    hideFromDatePicker();
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View
          style={{
            width: '15%',
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
            Organization Type
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearCompletionData}
            value={'Government'}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Government'}
            searchPlaceholder="Search..."
            onChange={item => {}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Industry Type
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearCompletionData}
            value={'Agro Based Industry'}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Agro Based Industry'}
            searchPlaceholder="Search..."
            onChange={item => {}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Team Size
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearCompletionData}
            value={'500 - 1000'}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'500 - 1000'}
            searchPlaceholder="Search..."
            onChange={item => {}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
            }}>
            Website URL
          </Text>
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
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Year of Establishment
          </Text>
          <TouchableOpacity
            onPress={() => showFromDatePicker()}
            style={{
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}>
              {moment(new Date()).format('YYYY MM DD')}
            </Text>
            <FIcon name="calendar" size={20} color={Color.black} />
          </TouchableOpacity>
          <DateTimePickerModal
            date={new Date()}
            isVisible={FromdatePickerVisible}
            mode="date"
            onConfirm={handleFromConfirm}
            onCancel={hideFromDatePicker}
          />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            navigation.navigate('SocialMedia');
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

export default Profile;
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
