import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Start from '../screens/Create';
import Room from '../screens/Room';
import Join from '../screens/Join';
import RoomCode from '../screens/RoomCode';
import Waiting from '../screens/Waiting';
import Contest from '../screens/Contest';
import Winner from '../screens/Winner';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Links: LinksScreen,
    Start: Start,
    Room: Room,
    Join: Join,
    Settings: SettingsScreen,
    RoomCode: RoomCode,
    Waiting: Waiting,
    Contest: Contest,
    Winner: Winner,
  },
  {
    initialRouteName: 'Start',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-link${focused ? '' : '-outline'}`
          : 'md-link'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-options${focused ? '' : '-outline'}`
          : 'md-options'
      }
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  Start,
});
