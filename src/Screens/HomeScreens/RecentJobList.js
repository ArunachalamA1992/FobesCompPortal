import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {job_posting} from '../../Config/Content';
import moment from 'moment';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import common_fn from '../../Config/common_fn';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RecentJobList = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <FlatList
        data={job_posting}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          const twentyFourHoursAgo = moment(
            new Date() - 24 * 60 * 60 * 1000,
          ).format('YYYY-MM-DD');
          const createdAt = moment(item?.created_at).format('YYYY-MM-DD');
          const newItem = twentyFourHoursAgo > createdAt;
          return (
            <TouchableOpacity
              key={index}
              style={{
                marginVertical: 10,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                padding: 15,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('JobApplicants', {item});
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Gilmer.Bold,
                    }}>
                    {item?.job_role}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Gilmer.Medium,
                      marginVertical: 5,
                    }}>
                    {`${item?.job_type} ${common_fn.calculateRemainingTime(
                      item?.end_date,
                    )}`}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.primary,
                        fontFamily: Gilmer.Bold,
                        marginRight: 10,
                      }}>
                      {item?.applicants} applied applicants
                    </Text>
                    {!newItem ? (
                      <View
                        style={{
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.red,
                            fontFamily: Gilmer.Medium,
                            backgroundColor: '#F94F4F10',
                            padding: 5,
                          }}>
                          New
                        </Text>
                      </View>
                    ) : (
                      <View style={{}} />
                    )}
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <MCIcon
                    name="dots-vertical"
                    size={20}
                    color={Color.black}
                    style={{flex: 1}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      fontFamily: Gilmer.Medium,
                    }}>
                    {moment(item?.created_at).format('DD MMM YY')}
                  </Text>
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

export default RecentJobList;
