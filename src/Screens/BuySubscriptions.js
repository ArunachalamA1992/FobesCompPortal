import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  LogBox,
  StatusBar,
  ScrollView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Color from '../Global/Color';
import {Gilmer} from '../Global/FontFamily';
import {Iconviewcomponent} from '../Componens/Icontag';
import {Button} from 'react-native-paper';
import fetchData from '../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {setPayCancelVisible, setPaySuccessVisible} from '../Redux';

LogBox.ignoreAllLogs();

const BuySubscriptions = ({navigation}) => {
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [planData, setPlanData] = useState([]);

  const [resdexData, setResdexData] = useState([
    {
      id: '0',
      validity: '7 days Validity',
      plan_status: 'Free Plan',
      plan_amount: '0',
      plan_redu_amount: '0',
      plan_subs_text: [
        {
          id: '0',
          text: 'Post 1 Jobs',
        },
        {
          id: '1',
          text: '0 Featured Job',
        },
        {
          id: '2',
          text: '0 Highlights Job',
        },
        {
          id: '3',
          text: '3 Candidates Profile View',
        },
      ],
    },
    {
      id: '1',
      validity: '2 days Validity',
      plan_status: 'Basic Plan',
      plan_amount: '1000',
      plan_redu_amount: '1999',
      plan_subs_text: [
        {
          id: '0',
          text: 'Post 1 Jobs',
        },
        {
          id: '1',
          text: '0 Featured Job',
        },
        {
          id: '2',
          text: '0 Highlights Job',
        },
      ],
    },
    {
      id: '2',
      validity: '30 days Validity',
      plan_status: 'Pro Plan',
      plan_amount: '2500',
      plan_redu_amount: '3000',
      plan_subs_text: [
        {
          id: '0',
          text: 'Post 1 Jobs',
        },
        {
          id: '1',
          text: '0 Featured Job',
        },
        {
          id: '2',
          text: '0 Highlights Job',
        },
      ],
    },
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

  useEffect(() => {
    getPlanData();
  }, []);

  const getPlanData = async () => {
    try {
      const plan_data = await fetchData.company_plan(``, token);
      const transformedData = transformData(plan_data?.data);
      setPlanData(transformedData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const paymentDetails = async plan_id => {
    const paymentData = {
      plan_id: plan_id,
    };
    const payment_start = await fetchData.post_plan(paymentData, token);
    console.log('payment_start', payment_start)
    RazorpayCheckout.open(payment_start?.data)
      .then(async ({razorpay_signature, razorpay_payment_id}) => {
        var data = {
          order_id: payment_start?.data?.order_id,
          plan_id: plan_id,
          payment_id: razorpay_payment_id,
        };
        console.log('data', data)
        const placeOrder = await fetchData.verify_pay(
          data,
          token,
          razorpay_signature,
        );
        console.log('placeOrder---------------------', placeOrder);
        dispatch(setPaySuccessVisible(true));
        navigation?.replace('TabNavigator');
      })
      .catch(error => {
        dispatch(setPayCancelVisible(true));
        navigation?.replace('TabNavigator');
      });
  };

  const transformData = data => {
    return data.map((item, index) => ({
      plan_id: item.plan_id,
      validity: `${item.plan_valid_days} days Validity`,
      plan_status: item.label,
      plan_amount: item.price.toString(),
      plan_subs_text: [
        {
          id: '0',
          text: `Post ${item.job_limit} Jobs`,
          sub_value: item.job_limit > 0 ? 'positive' : 'negative',
        },
        {
          id: '1',
          text: `${item.featured_job_limit} Featured Job`,
          sub_value: item.featured_job_limit > 0 ? 'positive' : 'negative',
        },
        {
          id: '2',
          text: `${item.highlight_job_limit} Highlights Job`,
          sub_value: item.highlight_job_limit > 0 ? 'positive' : 'negative',
        },
        {
          id: '3',
          text: `${item.candidate_cv_view_limit} Candidates Profile View`,
          sub_value: item.candidate_cv_view_limit > 0 ? 'positive' : 'negative',
        },
        {
          id: '4',
          text: 'Job Branding',
          sub_value: item.profile_verify ? 'positive' : 'negative',
        },
        {
          id: '5',
          text: 'Smart Boost Via Whatsapp',
          sub_value: 'negative',
        },
        {
          id: '6',
          text: 'Get Noticed with Urgent Hiring tag',
          sub_value: 'negative',
        },
        {
          id: '7',
          text: 'Ability to verify company profile',
          sub_value: item.profile_verify ? 'positive' : 'negative',
        },
      ],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 280,
            backgroundColor: Color.primary,
            padding: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 5,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={require('../assets/logos/fobes_logo.png')}
              style={{
                width: 90,
                height: 80,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text
              style={{
                fontSize: 18,
                color: Color.white,
                fontFamily: Gilmer.Medium,
                textAlign: 'justify',
                letterSpacing: 0.2,
                lineHeight: 25,
              }}>
              Unlock the Power of Premium Job Postings
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.white,
                fontFamily: Gilmer.Regular,
                paddingVertical: 10,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              Elevate your job postings with a premium subscription. Get
              expanded reach, targeted promotion, and advanced applicant
              filtering.
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            top: -50,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.white,
              elevation: 5,
              borderRadius: 5,
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                fontFamily: Gilmer.Bold,
                textAlign: 'center',
                letterSpacing: 0.2,
                lineHeight: 25,
              }}>
              CHOOSE PAY PER JOB POSTING
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.lightBlack,
                fontFamily: Gilmer.Regular,
                paddingVertical: 10,
                textAlign: 'center',
                lineHeight: 20,
              }}>
              Pay only for individual job creations. Highlight or feature your
              postings to attract top talent.
            </Text>

            <Button
              mode="contained"
              onPress={async () => {
                try {
                } catch (err) {}
              }}
              style={{
                backgroundColor: Color.primary,
                marginHorizontal: 10,
                borderRadius: 5,
              }}
              textColor={Color.white}>
              Post per job
            </Button>
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              textAlign: 'center',
              letterSpacing: 0.2,
              lineHeight: 25,
            }}>
            Select Your Plan
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              paddingVertical: 5,
              textAlign: 'center',
            }}>
            Explore the perfect pricing plan that suits your needs and take your
            journey to new heights.
          </Text>

          <FlatList
            data={planData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              console.log(item?.plan_status == 'Free Plan');
              return (
                <View
                  key={index}
                  style={{
                    width: 300,
                    margin: 5,
                    backgroundColor: Color.white,
                    elevation: 3,
                    borderRadius: 5,
                    opacity: item?.plan_status == 'Free Plan' ? 0.5 : 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Bold,
                      }}>
                      {item.validity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Gilmer.Bold,
                        color: Color.primary,
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: '#E5EBF5',
                        borderRadius: 5,
                      }}>
                      {item.plan_status}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 25,
                      color: Color.black,
                      fontFamily: Gilmer.Bold,
                      marginHorizontal: 10,
                    }}>
                    ₹ {item.plan_amount}
                  </Text>
                  <View style={{paddingHorizontal: 10, marginVertical: 10}}>
                    {planData[0].plan_subs_text.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            padding: 5,
                          }}>
                          {item?.sub_value === 'positive' ? (
                            <View
                              style={{
                                backgroundColor: '#E5EBF5',
                                borderRadius: 100,
                                padding: 5,
                              }}>
                              <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={'check'}
                                icon_size={15}
                                icon_color={Color.primary}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                backgroundColor: '#9A000010',
                                borderRadius: 100,
                                padding: 5,
                              }}>
                              <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={'close'}
                                icon_size={15}
                                icon_color={'#F94F4F'}
                              />
                            </View>
                          )}
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Gilmer.Bold,
                              paddingHorizontal: 10,
                            }}>
                            {item.text}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Color.primary,
                      marginTop: 10,
                      borderBottomStartRadius: 5,
                      borderBottomEndRadius: 5,
                    }}
                    disabled={item?.plan_status == 'Free Plan'}
                    onPress={() => {
                      paymentDetails(item?.plan_id);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.white,
                        fontFamily: Gilmer.Medium,
                      }}>
                      Buy Now
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontFamily: Gilmer.Bold,
              textAlign: 'center',
              letterSpacing: 0.2,
              lineHeight: 25,
            }}>
            Select Your Resdex Plan
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              paddingVertical: 5,
              textAlign: 'center',
            }}>
            Resdex - India's largest resume database for all your hiring needs.
          </Text>

          <FlatList
            data={resdexData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: 300,
                    margin: 5,
                    backgroundColor: Color.white,
                    elevation: 3,
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Gilmer.Bold,
                      }}>
                      {item.validity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Gilmer.Bold,
                        color: Color.primary,
                        padding: 5,
                        backgroundColor: '#E5EBF5',
                        borderRadius: 5,
                      }}>
                      {item.plan_status}
                    </Text>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: Color.black,
                          fontFamily: Gilmer.Bold,
                        }}>
                        ₹ {item.plan_amount}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Gilmer.Bold,
                          padding: 5,
                          textDecorationLine: 'line-through',
                        }}>
                        ₹ {item.plan_redu_amount}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.red,
                        fontFamily: Gilmer.Medium,
                      }}>
                      Inclusive of 18% GST
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    {resdexData[0].plan_subs_text.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            padding: 5,
                          }}>
                          <View
                            style={{
                              backgroundColor: '#E5EBF5',
                              borderRadius: 100,
                              padding: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'FontAwesome'}
                              iconname={'check'}
                              icon_size={15}
                              icon_color={Color.primary}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Gilmer.Bold,
                              paddingHorizontal: 10,
                            }}>
                            {item.text}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  <Button
                    mode="contained"
                    onPress={async () => {
                      try {
                        navigation.navigate('BuySubscriptions');
                      } catch (err) {}
                    }}
                    style={{
                      backgroundColor: Color.primary,
                      marginHorizontal: 10,
                      borderRadius: 10,
                    }}
                    textColor={Color.white}>
                    Buy Now
                  </Button>
                </View>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      {netInfo_State ? null : (
        <Animated.View
          animation="fadeInRight"
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 1,
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
  },
});

export default BuySubscriptions;
