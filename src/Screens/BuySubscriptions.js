//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    View,
    FlatList,
    TextInput,
    Keyboard,
    ScrollView,
    Image,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    SectionList,
    Alert,
    Platform,
    UIManager,
    LayoutAnimation,
    LogBox,
    Modal,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Color from '../Global/Color';
import { Media } from '../Global/Media';
import { scr_width } from '../Utils/Dimensions';
import { Gilmer } from '../Global/FontFamily';
import { Iconviewcomponent } from '../Componens/Icontag';
LogBox.ignoreAllLogs();

// create a component
const BuySubscriptions = () => {
    const dispatch = useDispatch();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    let listOffset = useRef({});
    const [tabIndex, setIndex] = useState(0);
    const [routes] = useState([
        { id: 1, title: 'header' },
        { id: 2, title: 'job' },
        { id: 3, title: 'post' },
        { id: 4, title: 'res' },
    ]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [BuySection] = useState([
        { id: 1, title: 'Fobes subs header', data: ['Fobes subs header'] },
        { id: 2, title: 'Fobes subs post job', data: ['Fobes subs post job'] },
        { id: 3, title: 'Fobes subs post plan', data: ['Fobes subs post plan'] },
        { id: 4, title: 'Fobes subs resdex plan', data: ['Fobes subs resdex plan'] },
    ]);

    const [planData, setPlanData] = useState([
        {
            'id': '0',
            'validity': '7 days Validity',
            'plan_status': 'Free Plan',
            'plan_amount': '0',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs',
                    'sub_value': 'positive'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job',
                    'sub_value': 'positive'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job',
                    'sub_value': 'positive'
                },
                {
                    'id': '3',
                    'text': '3 Candidates Profile View',
                    'sub_value': 'positive'
                },
                {
                    'id': '4',
                    'text': 'Job Branding',
                    'sub_value': 'negative'
                },
                {
                    'id': '5',
                    'text': 'Smart Boost Via Whatsapp',
                    'sub_value': 'negative'
                },
                {
                    'id': '6',
                    'text': 'Get Noticed with Urgent Hiring tag',
                    'sub_value': 'negative'
                },
                {
                    'id': '7',
                    'text': 'Ability to verify company profile',
                    'sub_value': 'negative'
                },
            ]

        },
        {
            'id': '1',
            'validity': '15 days Validity',
            'plan_status': 'Basic Plan',
            'plan_amount': '1000',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job'
                },
                {
                    'id': '3',
                    'text': '3 Candidates Profile View'
                },
                {
                    'id': '4',
                    'text': 'Job Branding'
                },
                {
                    'id': '5',
                    'text': 'Smart Boost Via Whatsapp'
                },
                {
                    'id': '6',
                    'text': 'Get Noticed with Urgent Hiring tag'
                },
                {
                    'id': '7',
                    'text': 'Ability to verify company profile'
                },
            ]

        },
        {
            'id': '2',
            'validity': '30 days Validity',
            'plan_status': 'Pro Plan',
            'plan_amount': '2500',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job'
                },
                {
                    'id': '3',
                    'text': '3 Candidates Profile View'
                },
                {
                    'id': '4',
                    'text': 'Job Branding'
                },
                {
                    'id': '5',
                    'text': 'Smart Boost Via Whatsapp'
                },
                {
                    'id': '6',
                    'text': 'Get Noticed with Urgent Hiring tag'
                },
                {
                    'id': '7',
                    'text': 'Ability to verify company profile'
                },
            ]

        },
    ]);

    const [resdexData, setResdexData] = useState([
        {
            'id': '0',
            'validity': '7 days Validity',
            'plan_status': 'Free Plan',
            'plan_amount': '0',
            'plan_redu_amount': '0',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job'
                },
                {
                    'id': '3',
                    'text': '3 Candidates Profile View'
                },

            ]

        },
        {
            'id': '1',
            'validity': '2 days Validity',
            'plan_status': 'Basic Plan',
            'plan_amount': '1000',
            'plan_redu_amount': '1999',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job'
                },

            ]

        },
        {
            'id': '2',
            'validity': '30 days Validity',
            'plan_status': 'Pro Plan',
            'plan_amount': '2500',
            'plan_redu_amount': '3000',
            'plan_subs_text': [
                {
                    'id': '0',
                    'text': 'Post 1 Jobs'
                },
                {
                    'id': '1',
                    'text': '0 Featured Job'
                },
                {
                    'id': '2',
                    'text': '0 Highlights Job'
                },

            ]

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
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
    };

    const syncScrollOffset = () => {
        // const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach(item => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }

            <Animated.SectionList
                sections={BuySection}
                scrollEnabled={true}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                nestedScrollEnabled
                initialNumToRender={4}
                renderItem={({ item }) => {
                    switch (item) {
                        case 'Fobes subs header':
                            return (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: 280, backgroundColor: Color.primary, padding: 10, alignItems: 'center' }}>
                                        <View style={{ width: '100%', paddingHorizontal: 5, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            <Image
                                                source={require('../assets/logos/fobes_logo.png')}
                                                style={{
                                                    width: 90, height: 80,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', paddingHorizontal: 10 }}>
                                            <Text style={{ fontSize: 18, color: Color.white, fontFamily: Gilmer.Medium, textAlign: 'justify', letterSpacing: 0.2, lineHeight: 25 }}>Unlock the Power of Premium Job Postings</Text>
                                            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Gilmer.Regular, paddingVertical: 10, textAlign: 'justify', lineHeight: 20 }}>Elevate your job postings with a premium subscription. Get expanded reach, targeted promotion, and advanced applicant filtering.</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'Fobes subs post job':
                            return (
                                <View
                                    style={{
                                        width: '98%', position: 'relative',
                                        alignItems: 'center',
                                        paddingHorizontal: 20, paddingVertical: 0, top: -50
                                    }}>
                                    <View style={{ width: '90%', justifyContent: 'center', alignItems: "center", backgroundColor: Color.white, elevation: 5, borderRadius: 10, padding: 20 }}>
                                        <Text style={{ fontSize: 18, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', letterSpacing: 0.2, lineHeight: 25 }}>CHOOSE PAY PER JOB POSTING</Text>
                                        <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Gilmer.Regular, paddingVertical: 10, textAlign: 'center', lineHeight: 20 }}>Pay only for individual job creations. Highlight or feature your postings to attract top talent.</Text>

                                        <TouchableOpacity
                                            style={{ width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, marginTop: 10, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Gilmer.Medium }}>Post Per Job</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        case 'Fobes subs post plan':
                            return (
                                <View
                                    style={{
                                        width: '98%',
                                        alignItems: 'center',
                                        paddingHorizontal: 20, paddingVertical: 0
                                    }}>
                                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 5, }}>
                                        <Text style={{ fontSize: 18, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', letterSpacing: 0.2, lineHeight: 25 }}>Select Your Plan</Text>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Gilmer.Regular, paddingVertical: 5, textAlign: 'center', lineHeight: 25 }}>Explore the perfect pricing plan that suits your needs and take your journey to new heights.</Text>
                                    </View>

                                    <View style={{ width: '100%' }}>

                                        <FlatList
                                            data={planData}
                                            keyExtractor={(item, index) => item + index}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={{
                                                        width: 260, alignItems: 'center', margin: 5,
                                                        justifyContent: 'center', backgroundColor: Color.white, elevation: 3, borderRadius: 5
                                                    }}>
                                                        <View style={{ width: '100%', flexDirection: 'row', padding: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Gilmer.Medium }}>{item.validity}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: Gilmer.Medium, color: Color.primary, padding: 5, paddingHorizontal: 10, backgroundColor: '#E5EBF5', borderRadius: 5 }}>{item.plan_status}</Text>
                                                        </View>
                                                        <View style={{ width: '100%', flexDirection: 'row', padding: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 22, color: Color.black, fontFamily: Gilmer.Bold }}>₹ {item.plan_amount}</Text>
                                                        </View>
                                                        <View style={{ width: '100%', paddingHorizontal: 10 }}>
                                                            {planData[0].plan_subs_text.map((item, index) => {
                                                                return (
                                                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5 }}>

                                                                        {item?.sub_value === "positive" ?
                                                                            <Iconviewcomponent
                                                                                Icontag={'Ionicons'}
                                                                                iconname={'checkmark-circle'}
                                                                                icon_size={20}
                                                                                icon_color={Color.primary}
                                                                            /> :
                                                                            <Iconviewcomponent
                                                                                Icontag={'Ionicons'}
                                                                                iconname={'close-circle'}
                                                                                icon_size={20}
                                                                                icon_color={Color.red}
                                                                            />}
                                                                        <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Gilmer.Regular, paddingHorizontal: 10 }}>{item.text}</Text>
                                                                    </View>
                                                                );
                                                            })}
                                                        </View>
                                                        <TouchableOpacity
                                                            style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, marginTop: 10, borderBottomStartRadius: 5, borderBottomEndRadius: 5 }}>
                                                            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Gilmer.Medium }}>Buy Now</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                </View>
                            );
                        case 'Fobes subs resdex plan':
                            return (
                                <View
                                    style={{
                                        width: '98%',
                                        alignItems: 'center',
                                        paddingHorizontal: 20, paddingVertical: 20
                                    }}>
                                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 5, }}>
                                        <Text style={{ fontSize: 18, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', letterSpacing: 0.2, lineHeight: 25 }}>Select Your Resdex Plan</Text>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Gilmer.Regular, paddingVertical: 5, textAlign: 'center', lineHeight: 25 }}>Resdex - India's largest resume database for all your hiring needs.</Text>
                                    </View>

                                    <View style={{ width: '100%' }}>

                                        <FlatList
                                            data={resdexData}
                                            keyExtractor={(item, index) => item + index}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={{
                                                        width: 270, alignItems: 'center', margin: 5, padding: 10,
                                                        justifyContent: 'center', backgroundColor: Color.white, elevation: 3, borderRadius: 5
                                                    }}>
                                                        <View style={{ width: '100%', flexDirection: 'row', padding: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Gilmer.Medium }}>{item.validity}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: Gilmer.Medium, color: Color.primary, padding: 10, paddingHorizontal: 15, backgroundColor: '#E5EBF5', borderRadius: 5 }}>{item.plan_status}</Text>
                                                        </View>
                                                        <View style={{ width: '100%', }}>
                                                            <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, }}>
                                                                <Text style={{ fontSize: 20, color: Color.black, fontFamily: Gilmer.Bold }}>₹ {item.plan_amount}</Text>
                                                                <Text style={{ fontSize: 15, color: Color.cloudyGrey, fontFamily: Gilmer.Bold, padding: 5, textDecorationLine: 'line-through' }}>₹ {item.plan_redu_amount}</Text>
                                                            </View>
                                                            <Text style={{ width: '100%', fontSize: 14, color: Color.red, fontFamily: Gilmer.Medium, paddingHorizontal: 10 }}>Inclusive of 18% GST</Text>
                                                        </View>
                                                        <View style={{ width: '100%', paddingHorizontal: 5, marginTop: 10 }}>
                                                            {resdexData[0].plan_subs_text.map((item, index) => {
                                                                return (
                                                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5 }}>
                                                                        <Iconviewcomponent
                                                                            Icontag={'Ionicons'}
                                                                            iconname={'checkmark-circle'}
                                                                            icon_size={20}
                                                                            icon_color={Color.primary}
                                                                        />
                                                                        <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Gilmer.Regular, paddingHorizontal: 10 }}>{item.text}</Text>
                                                                    </View>
                                                                );
                                                            })}
                                                        </View>
                                                        <TouchableOpacity
                                                            style={{ width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, marginTop: 10, borderRadius: 5 }}>
                                                            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Gilmer.Medium }}>Buy Now</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                </View>
                            );
                    }
                }}
            />

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default BuySubscriptions;
