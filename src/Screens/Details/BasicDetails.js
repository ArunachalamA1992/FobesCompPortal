import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {pick} from 'react-native-document-picker';
import {Iconviewcomponent} from '../../Componens/Icontag';
import {Button} from 'react-native-paper';

const BasicDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 6,
          backgroundColor: Color.Whisper,
          borderRadius: 10,
        }}
      />
      <View style={{flex: 1}}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Company Information
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const [{name, uri}] = await pick();
                  // getResumeUpload({name, uri});
                } catch (error) {
                  console.log('error', error);
                }
              }}
              style={{
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 130,
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 5,
                borderStyle: 'dashed',
                marginVertical: 10,
                padding: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'folder-open'}
                  icon_size={30}
                  icon_color={'#A0C7EB'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    textAlign: 'center',
                    fontFamily: Gilmer.Medium,
                    marginVertical: 10,
                  }}>
                  Image size (68*68)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.primary,
                    textAlign: 'center',
                    fontFamily: Gilmer.Medium,
                  }}>
                  Browse Files
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const [{name, uri}] = await pick();
                  // getResumeUpload({name, uri});
                } catch (error) {
                  console.log('error', error);
                }
              }}
              style={{
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 130,
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 5,
                borderStyle: 'dashed',
                marginVertical: 10,
                padding: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'folder-open'}
                  icon_size={30}
                  icon_color={'#A0C7EB'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    textAlign: 'center',
                    fontFamily: Gilmer.Medium,
                    marginVertical: 10,
                  }}>
                  Image size (1920*312)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.primary,
                    textAlign: 'center',
                    fontFamily: Gilmer.Medium,
                  }}>
                  Browse Files
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.Bold,
            }}>
            Company Name
          </Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={Color.cloudyGrey}
            value={'Full Name'}
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.Bold,
              }}>
              About Company
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontFamily: Gilmer.Medium,
              }}>
              {' '}
              (optional)
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              backgroundColor: '#EAEAEF50',
              borderRadius: 5,
            }}>
            <TextInput
              placeholder="biography"
              placeholderTextColor={Color.cloudyGrey}
              multiline={true}
              value={'biography'}
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
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            navigation.navigate('profileDetails');
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

export default BasicDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});
