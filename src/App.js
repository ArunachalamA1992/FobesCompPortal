import React, {useEffect} from 'react';
import {LogBox, StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import {Provider, useDispatch} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import TabNavigator, {Auth} from './route';
import SplashScreen from './SplashScreen';
import {Linking} from 'react-native';
import {setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from './Redux/Store';
import OnboardOne from './Screens/OnboardScreens/OnboardOne';
import Color from './Global/Color';
import { navigationRef } from '../RootNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dispatch = useDispatch();

  const linking = {
    prefixes: ['https://fobes.in/job', 'fobes://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        DetailedScreen: {
          path: '/:slug',
        },
      },
    },
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_data');
        if (value !== null) {
          dispatch(setUserData(JSON.parse(value)));
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      try {
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        // navigation.navigate('DetailedScreen', { slug });
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    const handleInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          handleDeepLink({url: initialUrl});
        }
      } catch (error) {
        console.error('Error handling initial URL:', error);
      }
    };

    handleInitialUrl();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}
          // drawerContent={props => <CustomDrawerContent {...props} />}
          >
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="DetailedScreen"
            component={DetailedScreen}
            options={{headerShown: false}}
          /> */}
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
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
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
        {/* <Stack.Screen
          name="OnboardTwo"
          component={OnboardTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardThree"
          component={OnboardThree}
          options={{headerShown: false}}
        /> */}
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

        {/* <Stack.Screen
          name="SearchDataList"
          component={SearchDataList}
          options={({navigation, route}) => ({
            headerTitle: 'Jobs',
            headerTitleAlign: 'center',
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
          name="AppliedJobs"
          component={AppliedJobs}
          options={({navigation, route}) => ({
            headerTitle: 'Applied Jobs',
            headerTitleAlign: 'center',
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
          name="Notification"
          component={Notification}
          options={({navigation, route}) => ({
            headerTitle: 'Notification',
            headerTitleAlign: 'center',
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
          name="JobStatus"
          component={JobStatus}
          options={({navigation, route}) => ({
            headerTitle: 'Applied Jobs Status',
            headerTitleAlign: 'center',
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
          name="Skill"
          component={SkillScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Key Skills',
            headerTitleStyle: {color: Color.black},
            headerTitleAlign: 'center',
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
          name="basicdetails"
          component={BasicDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Basic Details',
            headerTitleStyle: {color: Color.black},
            headerTitleAlign: 'center',
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
          name="Applycompletion"
          component={Applycompletion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterList"
          component={FilterListScreen}
          options={({navigation, route}) => ({
            headerTitle: '',
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
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation, route}) => ({
            headerTitle: '',
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
          name="PassOtpVerify"
          component={PassOtpVerify}
          options={({navigation, route}) => ({
            headerTitle: '',
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
          name="ResetPass"
          component={ResetPass}
          options={({navigation, route}) => ({
            headerTitle: '',
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
        /> */}
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
