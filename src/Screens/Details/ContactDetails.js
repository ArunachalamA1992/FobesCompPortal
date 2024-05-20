import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Color from '../../Global/Color';
import {Dropdown} from 'react-native-element-dropdown';
import {Gilmer} from '../../Global/FontFamily';
import {Button} from 'react-native-paper';

const ContactDetails = ({navigation}) => {
  const [yearCompletionData, setYearCompletionData] = useState([]);
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View
          style={{
            width: '77%',
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Country
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={yearCompletionData}
              value={''}
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Country'}
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
              City
            </Text>
            <TextInput
              placeholder="Enter city name"
              placeholderTextColor={Color.cloudyGrey}
              value={''}
              onChangeText={text => {}}
              style={{
                borderColor: Color.lightgrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                backgroundColor: '#EAEAEF50',
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter full address"
                placeholderTextColor={Color.cloudyGrey}
                multiline={true}
                value={''}
                onChangeText={text => {}}
                returnKeyType={'done'}
                style={{
                  color: 'black',
                  minHeight: 150,
                  borderRadius: 10,
                  padding: 10,
                  width: '100%',
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  fontSize: 16,
                  textAlign: 'justify',
                  fontFamily: Gilmer.Medium,
                  paddingHorizontal: 10,
                }}
                textAlignVertical="top"
                showSoftInputOnFocus={true}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Phone Number
            </Text>
            <TextInput
              placeholder="Enter Mobile Number"
              placeholderTextColor={Color.cloudyGrey}
              value={''}
              onChangeText={text => {}}
              style={{
                borderColor: Color.lightgrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              Email  Id
            </Text>
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor={Color.cloudyGrey}
              value={''}
              onChangeText={text => {}}
              style={{
                borderColor: Color.lightgrey,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}
            />
          </View>
        </View>
        <Button
          mode="contained"
          onPress={async () => {
            try {
              navigation.navigate('ProfileCompletion');
            } catch (err) {}
          }}
          style={{
            backgroundColor: Color.primary,
            marginHorizontal: 10,
          }}
          textColor={Color.white}>
          Next
        </Button>
      </ScrollView>
    </View>
  );
};

export default ContactDetails;
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
