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
import Color from '../../Global/Color';
import { Gilmer } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Componens/Icontag';
LogBox.ignoreAllLogs();

// create a component
const PromoteJob = () => {

    const navigation = useNavigation();
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
    ]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [BuySection] = useState([
        { id: 1, title: 'Fobes subs header', data: ['Fobes subs header'] },
        { id: 2, title: 'Fobes subs post job', data: ['Fobes subs post job'] },
    ]);
    const [deleteReason, setDeleteReason] = useState("Featured");

    const [deleteReasonData] = useState([
        { id: 1, title: 'Featured ( On the top )', value: 'Featured' },
        { id: 2, title: 'Highlight Job', value: 'Highlight', },
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
                                    <View style={{ width: '100%', paddingHorizontal: 10, alignItems: 'center', padding: 10 }}>
                                        <Text style={{ fontSize: 18, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'justify', letterSpacing: 0.2, lineHeight: 25, padding: 10 }}>UXUI Designer</Text>
                                        <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Gilmer.Regular, paddingVertical: 10, textAlign: 'justify', lineHeight: 20, padding: 10 }}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document meaningful content.</Text>
                                    </View>
                                </View>
                            );
                        case 'Fobes subs post job':
                            return (
                                <View
                                    style={{
                                        width: '100%',
                                        paddingHorizontal: 10, paddingVertical: 20
                                    }}>
                                    <View style={{
                                        width: '100%', flexDirection: 'row', justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <View style={{ width: '48%', height: 240, justifyContent: 'center', alignItems: "center", backgroundColor: deleteReason ? "#DBF3FF" : Color.white, elevation: 5, borderRadius: 5, padding: 15, bottom: 2 }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', marginTop: 30 }}>Always on the top</Text>
                                            <Image
                                                source={require('../../assets/images/blue_high.png')}
                                                style={{
                                                    width: '100%', height: '100%',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>

                                        <View style={{ width: '48%', height: 240, justifyContent: 'center', alignItems: "center", backgroundColor: deleteReason ? "#EAEAEF" : Color.white, elevation: 5, borderRadius: 5, padding: 15, bottom: 2 }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Gilmer.Medium, textAlign: 'center', marginTop: 30 }}>Highlight with Yellow Color</Text>
                                            <Image
                                                source={require('../../assets/images/yellow_high.png')}
                                                style={{
                                                    width: '100%', height: '100%',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                                        {deleteReasonData?.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        setDeleteReason(item);
                                                    }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        padding: 10,
                                                    }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Ionicons'}
                                                        iconname={deleteReason?.id === item.id
                                                            ? 'radio-button-on'
                                                            : 'radio-button-off'}
                                                        icon_size={20}
                                                        icon_color={deleteReason?.id === item.id
                                                            ? Color.primary
                                                            : Color.black}
                                                    />

                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: Color.black,
                                                            fontFamily: Gilmer.Medium,
                                                            marginHorizontal: 10,
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{ width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Gilmer.Medium }}>Buy Now</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                            style={{ width: '95%', height: 50, marginVertical: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, borderColor: Color.primary, borderWidth: 1, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Gilmer.Medium }}>Skip Now</Text>
                                        </TouchableOpacity>
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
export default PromoteJob;
