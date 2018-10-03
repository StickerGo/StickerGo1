import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DrawCanvas from '../screens/DrawCanvas';
import CameraView from '../screens/CameraView';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import CreateRoom from '../screens/CreateRoom';
import JoinRoom from '../screens/JoinRoom';
import RoomCode from '../screens/RoomCode';
import Waiting from '../screens/Waiting';
import Vote from '../screens/Vote';
import Winner from '../screens/Winner';

const HomeStack = createStackNavigator(
  {
    Home: Home,
    CreateRoom: CreateRoom,
    RoomCode: RoomCode,
    JoinRoom: JoinRoom,
    DrawCanvas: DrawCanvas,
    CameraView: CameraView,
    VoteScreen: Vote,
    Waiting: Waiting,
    Winner: Winner,
    Settings: Settings,
  },
  {
    initialRouteName: 'Home',
  }
);

HomeStack.navigationOptions = {
  header: null,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'ios-home'
      }
    />
  ),
};

const GameStack = createStackNavigator(
  {
    Home: Home,
    CreateRoom: CreateRoom,
    RoomCode: RoomCode,
    JoinRoom: JoinRoom,
    Draw: DrawCanvas,
    CameraView: CameraView,
    VoteScreen: Vote,
    Waiting: Waiting,
    Winner: Winner,
    Settings: Settings,
  },
  {
    initialRouteName: 'Draw',
  }
);

GameStack.navigationOptions = {
  header: null,
  tabBarLabel: 'Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-play${focused ? '' : '-outline'}`
          : 'ios-play'
      }
    />
  ),
};

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });
//
// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-link${focused ? '' : '-outline'}`
//           : 'md-link'
//       }
//     />
//   ),
// };

const SettingsStack = createStackNavigator(
  {
    Home: Home,
    CreateRoom: CreateRoom,
    RoomCode: RoomCode,
    JoinRoom: JoinRoom,
    Draw: DrawCanvas,
    CameraView: CameraView,
    VoteScreen: Vote,
    Waiting: Waiting,
    Winner: Winner,
    Settings: Settings,
  },
  {
    initialRouteName: 'Settings',
  }
);

SettingsStack.navigationOptions = {
  header: null,
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
  // LinksStack,
  GameStack,
  SettingsStack,
});
