import React from 'react';
import {LogBox, StatusBar, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
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
import {Gilmer} from './Global/FontFamily';
import SocialMedia from './Screens/Details/SocialMedia';
import ContactDetails from './Screens/Details/ContactDetails';
import ProfileCompletion from './Screens/Details/ProfileCompletion';
import Profile from './Screens/Details/Profile';
import Notification from './Screens/HomeScreens/Notification';
import ApplicantDetails from './Screens/HomeScreens/ApplicantDetails';
import JobApplicants from './Screens/JobPosted/JobApplicants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}>
          <Drawer.Screen
            name="Home"
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
          name="Notification"
          component={Notification}
          options={({navigation, route}) => ({
            headerTitle: 'Notifications',
            headerTitleStyle: {color: Color.black},
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
          options={({navigation, route}) => ({
            headerTitle: 'Basic Details',
            headerTitleStyle: {color: Color.black},
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
                  0% Completed
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="profileDetails"
          component={Profile}
          options={({navigation, route}) => ({
            headerTitle: 'Profile',
            headerTitleStyle: {color: Color.black},
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
            headerTitleStyle: {color: Color.black},
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
            headerTitle: 'Social Media',
            headerTitleStyle: {color: Color.black},
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
          name="JobApplicants"
          component={JobApplicants}
          options={({navigation, route}) => ({
            headerTitle: route?.params?.item?.job_role,
            headerTitleStyle: {color: Color.white},
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
            headerRight: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon name="list" size={30} color={Color.white} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ProfileCompletion"
          component={ProfileCompletion}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
