import React from 'react';
import {LogBox, StatusBar, Text, TouchableOpacity, View} from 'react-native';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import TabNavigator, {Auth} from './route';
import SplashScreen from './SplashScreen';
import Store from './Redux/Store';
import OnboardOne from './Screens/OnboardScreens/OnboardOne';
import Color from './Global/Color';
import {navigationRef} from '../RootNavigation';
import BasicDetails from './Screens/Details/BasicDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Gilmer} from './Global/FontFamily';
import SocialMedia from './Screens/Details/SocialMedia';
import ContactDetails from './Screens/Details/ContactDetails';
import ProfileCompletion from './Screens/Details/ProfileCompletion';
import Notification from './Screens/HomeScreens/Notification';
import ApplicantDetails from './Screens/HomeScreens/ApplicantDetails';
import JobApplicants from './Screens/JobPosted/JobApplicants';
import CustomDrawerContent from './Componens/Nav/CustomDrawerContent';
import Congratulations from './Screens/HomeScreens/Postjob/Congratulations';
import AdvanceInformation from './Screens/HomeScreens/Postjob/AdvanceInformation';
import SalaryandBenefits from './Screens/HomeScreens/Postjob/SalaryandBenefits';
import RecentJobList from './Screens/HomeScreens/RecentJobList';
import HomeScreen from './Screens/HomeScreens/HomeScreen';
import JobDetails from './Screens/HomeScreens/Postjob/JobDetails';
import BuySubscriptions from './Screens/BuySubscriptions';
import PromoteJob from './Screens/SideMenu/PromoteJob';
import SearchDataList from './Screens/HomeScreens/Search/SearchDataList';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import CandidateDetails from './Screens/HomeScreens/CandidateDetails';
import TermsandConditions from './Screens/SideMenu/TermsandConditions';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import FAQs from './Screens/SideMenu/FAQs';
import ContactUs from './Screens/SideMenu/ContactUs';
import AboutUs from './Screens/SideMenu/AboutUs';
import ProfileDetails from './Screens/Details/Profile';
import {NavigationDrawerStructure} from './Componens/Nav/NavDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="HomeDrawer"
          screenOptions={{swipeEnabled: false}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="HomeDrawer"
            component={MainApp}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardOne"
          component={OnboardOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecentJob"
          component={RecentJobList}
          options={({navigation, route}) => ({
            headerTitle: 'Recent Job',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="BuySubscriptions"
          component={BuySubscriptions}
          options={({navigation, route}) => ({
            headerTitle: 'Buy Subscriptions',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SearchDataList"
          component={SearchDataList}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="JobApplicants"
          component={JobApplicants}
          options={({navigation, route}) => ({
            headerTitle: route?.params?.title,
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={({navigation}) => ({
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('basicDetails', {type: 'update'});
                }}
                style={{marginRight: 15}}>
                <FIcon name="edit" size={25} color={Color.primary} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="PromoteJob"
          component={PromoteJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={({navigation, route}) => ({
            headerTitle: 'Notifications',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="basicDetails"
          component={BasicDetails}
          // options={({navigation, route}) => ({
          //   headerTitle: 'Basic Details',
          //   headerTitleStyle: {
          //     color: Color.black,
          //     fontFamily: Gilmer.Bold,
          //     fontSize: 18,
          //   },
          //   headerStyle: {backgroundColor: Color.white},
          //   headerLeft: () => (
          //     <View style={{marginHorizontal: 10}}>
          //       <Icon
          //         name="arrow-back"
          //         size={30}
          //         color={Color.black}
          //         onPress={() => navigation.goBack()}
          //       />
          //     </View>
          //   ),
          //   headerRight: () => (
          //     <View style={{marginHorizontal: 10}}>
          //       <Text
          //         style={{
          //           color: Color.primary,
          //           fontSize: 14,
          //           fontFamily: Gilmer.Medium,
          //         }}>
          //         0% Completed
          //       </Text>
          //     </View>
          //   ),
          // })}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="profileDetails"
          component={ProfileDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Profile',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    color: Color.primary,
                    fontSize: 14,
                    fontFamily: Gilmer.Medium,
                  }}>
                  15% Completed
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SocialMedia"
          component={SocialMedia}
          options={({navigation, route}) => ({
            headerTitle: 'Social Media',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    color: Color.primary,
                    fontSize: 14,
                    fontFamily: Gilmer.Medium,
                  }}>
                  45% Completed
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Contact Details',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    color: Color.primary,
                    fontSize: 14,
                    fontFamily: Gilmer.Medium,
                  }}>
                  77% Completed
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="applicantdetails"
          component={ApplicantDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="candidateDetails"
          component={CandidateDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Post Job',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SalaryandBenefits"
          component={SalaryandBenefits}
          options={({navigation, route}) => ({
            headerTitle: 'Post Job',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AdvanceInformation"
          component={AdvanceInformation}
          options={({navigation, route}) => ({
            headerTitle: 'Post Job',
            headerTitleStyle: {
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Congratulations"
          component={Congratulations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileCompletion"
          component={ProfileCompletion}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TermsandConditions"
          component={TermsandConditions}
          options={({navigation, route}) => ({
            headerTitle: 'Terms and Conditions',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={({navigation, route}) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQs}
          options={({navigation, route}) => ({
            headerTitle: 'FAQs',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={({navigation, route}) => ({
            headerTitle: 'ContactUs',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={({navigation, route}) => ({
            headerTitle: 'AboutUs',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Gilmer.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
