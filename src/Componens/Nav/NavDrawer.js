import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Color from '../../Global/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {Media} from '../../Global/Media';

export const NavigationDrawerStructure = ({navigation, home}) => {
  var {toggleDrawer} = navigation;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <TouchableOpacity
        onPress={() => toggleDrawer()}
        style={{borderColor: Color.smokeyGrey, marginRight: 10}}>
        <Icon
          name={'menu'}
          color={home == true ? Color.white : Color.white}
          size={30}
        />
      </TouchableOpacity>
      <Image
        source={Media.home_logo}
        style={{width: 80, height: 80, resizeMode: 'contain'}}
      />
    </View>
  );
};
