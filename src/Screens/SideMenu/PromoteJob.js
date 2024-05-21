import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  LogBox,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Componens/Icontag';
import {Button} from 'react-native-paper';
LogBox.ignoreAllLogs();

const PromoteJob = ({navigation}) => {
  const [netInfo_State, setNetinfo] = useState(true);
  const [PromotionItem, setPromotionItem] = useState('Featured');

  const [promotionData] = useState([
    {id: 1, title: 'Featured ( On the top )', value: 'Featured'},
    {id: 2, title: 'Highlight Job', value: 'Highlight'},
  ]);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log('catch in Home_interior use_Effect :', error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 18,
            color: Color.black,
            fontFamily: Gilmer.Bold,
            textAlign: 'center',
          }}>
          Promote Your Job
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: Color.black,
            fontFamily: Gilmer.Medium,
            textAlign: 'center',
            letterSpacing: 0.2,
            lineHeight: 25,
            padding: 10,
            marginTop: 30,
          }}>
          UXUI Designer
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Color.cloudyGrey,
            fontFamily: Gilmer.Regular,
            paddingVertical: 10,
            textAlign: 'center',
            lineHeight: 20,
            padding: 10,
          }}>
          Lorem ipsum is a placeholder text commonly used to demonstrate the
          visual form of a document meaningful content.
        </Text>
      </View>
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '48%',
              height: 240,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: PromotionItem ? '#DBF3FF' : Color.white,
              elevation: 5,
              borderRadius: 5,
              padding: 15,
              bottom: 2,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                fontFamily: Gilmer.Regular,
                textAlign: 'center',
                marginTop: 30,
              }}>
              Always on the top
            </Text>
            <Image
              source={require('../../assets/images/blue_high.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>

          <View
            style={{
              width: '48%',
              height: 240,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: PromotionItem ? '#EAEAEF' : Color.white,
              elevation: 5,
              borderRadius: 5,
              padding: 15,
              bottom: 2,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                fontFamily: Gilmer.Regular,
                textAlign: 'center',
                marginTop: 30,
              }}>
              Highlight with Yellow Color
            </Text>
            <Image
              source={require('../../assets/images/yellow_high.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          {promotionData?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPromotionItem(item);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={
                    PromotionItem?.id === item.id
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  icon_size={18}
                  icon_color={
                    PromotionItem?.id === item.id ? Color.primary : Color.black
                  }
                />

                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Gilmer.Medium,
                    marginRight: 5,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{marginTop: 20}}>
          <Button
            mode="contained"
            onPress={async () => {
              try {
                navigation.navigate('Home');
              } catch (err) {}
            }}
            style={{
              backgroundColor: Color.primary,
              marginHorizontal: 10,
              marginTop: 20,
              borderRadius: 5,
            }}
            textColor={Color.white}>
            Buy Now
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{
              backgroundColor: Color.white,
              borderColor: Color.primary,
              borderWidth: 1,
              marginHorizontal: 10,
              marginTop: 20,
              borderRadius: 5,
            }}
            textColor={Color.primary}>
            Skip Now
          </Button>
        </View>
      </View>
      {netInfo_State ? null : (
        <Animated.View
          animation="fadeInRight"
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#626262',
            opacity: 0.5,
            padding: 10,
            marginTop: Platform.OS == 'ios' ? 80 : 0,
          }}>
          <Text style={{color: 'white'}}>No Internet Connection</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});

export default PromoteJob;
