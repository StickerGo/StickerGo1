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
import ColorPicker from '../screens/ColorPicker';
// import WinnerWaiting from '../screens/WinnerWaiting'

export default createStackNavigator(
  {
    Home: Home, //go back to home
    CreateRoom: CreateRoom,
    RoomCode: RoomCode,
    JoinRoom: JoinRoom,
    DrawCanvas: DrawCanvas,
    CameraView: CameraView,
    VoteScreen: Vote, //go back to Vote
    Waiting: Waiting,
    Winner: Winner,
    Settings: Settings,
    //   WinnerWaiting: WinnerWaiting
    ColorPicker: ColorPicker,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);
