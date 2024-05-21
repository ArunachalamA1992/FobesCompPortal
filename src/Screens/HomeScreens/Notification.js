import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Gilmer} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import moment from 'moment';
import common_fn from '../../Config/common_fn';

const {height} = Dimensions.get('window');

const Notification = ({navigation}) => {
  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      name: '23 applies',
      role: "‘UX/UI Designer” Job position'",
      created_at: '2024-05-18T12:06:03.566Z',
    },
    {
      id: 2,
      name: '23 applies',
      role: "‘UX/UI Designer” Job position'",
      created_at: '2024-05-18T12:06:03.566Z',
    },
    {
      id: 3,
      name: '23 applies',
      role: "‘UX/UI Designer” Job position'",
      created_at: '2024-05-18T12:06:03.566Z',
    },
    {
      id: 4,
      name: '23 applies',
      role: "‘UX/UI Designer” Job position'",
      created_at: '2024-05-17T11:06:03.566Z',
    },
  ]);
  const groupNotificationsByDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const groupedNotifications = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    notificationData.forEach(notification => {
      const notificationDate = new Date(notification?.created_at);
      if (notificationDate.toDateString() === today.toDateString()) {
        groupedNotifications['Today'].push(notification);
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        groupedNotifications['Yesterday'].push(notification);
      } else {
        groupedNotifications['Earlier'].push(notification);
      }
    });

    return groupedNotifications;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <FlatList
        data={[
          {category: 'Today', data: groupedNotifications['Today']},
          {category: 'Yesterday', data: groupedNotifications['Yesterday']},
          {category: 'Earlier', data: groupedNotifications['Earlier']},
        ]}
        keyExtractor={(item, index) => item.category}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              {item.data.length > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Color.lightBlack,
                      fontFamily: Gilmer.Bold,
                      marginVertical: 5,
                    }}>
                    {item.category}
                  </Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      getMarkAllData();
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Gilmer.Medium,
                        marginVertical: 5,
                      }}>
                      {'Mark all as read'}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}
              {item.data.map((single_notify, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flex: 1,
                    borderColor: Color.lightgrey,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 5,
                  }}
                  onPress={() => {}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Color.lightgrey,
                        borderRadius: 100,
                      }}>
                      <FIcon name="group" size={20} color={Color.cloudyGrey} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Gilmer.Bold,
                          marginVertical: 5,
                          lineHeight: 20,
                        }}>
                        {single_notify?.name}{' '}
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Gilmer.Medium,
                            marginVertical: 5,
                            lineHeight: 20,
                          }}>
                          {single_notify?.role}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Gilmer.Medium,
                        }}
                        numberOfLines={2}>
                        {moment(single_notify?.created_at).format('HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: height / 1.5,
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
                No Notification Found
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;
