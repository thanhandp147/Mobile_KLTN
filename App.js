/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { _widthScale, _heightScale } from './src/Constant/Scale';
// import { createAppContainer } from 'react-navigation';
// import MainNav from './src/Navigation/AppNavigation'
import HomeScreen from './src/Screen/HomeScreen'
import SearchingScreen from './src/Screen/SearchingScreen'
import CateroryScreen from './src/Screen/CategoryScreen'
import UserScreen from './src/Screen/UserScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Store from './src/Redux/Store'
import { Provider } from "react-redux";



// const AppContainer = createAppContainer(MainNav);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import AppContainer from './src/Navigation/AppNavigation'

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Notifications" component={SplashScreen} />
//     </Stack.Navigator>
//   );
// }
console.disableYellowBox = true;

const App: () => React$Node = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // },[])

  return (
    <Provider store={Store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppContainer />
      </SafeAreaView>
    </Provider>
  );
};


export default App;
