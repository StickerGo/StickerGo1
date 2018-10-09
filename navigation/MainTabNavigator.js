import { createStackNavigator } from 'react-navigation';

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


export default createStackNavigator(
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
    WinnerWaiting: WinnerWaiting,
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },

  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);
