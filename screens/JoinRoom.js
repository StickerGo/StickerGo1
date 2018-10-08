import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { FBAddPlayer } from '../reducer/playerReducer';
import { stylesDefault } from '../styles/componentStyles';
import { addToRoom } from '../reducer/roomReducer';
import db from '../reducer/firebase';

// function checkRoomCodeCallback(code, exists) {
//   if (exists) {
//     console.log('THE ROOM EXISTS!');
//     return true;
//   } else {
//     console.log('THE ROOM DOES NOT EXIST :(');
//     return false;
//   }
// }

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Join extends React.Component {
  _onPressButton() {}
  constructor(props) {
    super(props);
    this.state = {
      pickval: 2,
      name: '',
      code: '',
      id: '',
      playerId: '',
      roomExists: true,
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.checkRoomCode = this.checkRoomCode.bind(this);
    // this.checkRoomCodeCallback = this.checkRoomCodeCallback.bind(this)
  }

  componentDidMount() {
    const randomNum = Math.floor(Math.random() * 1000 + 1);
    //once we connect with the room generator, add to id
    const id = randomNum;
    this.setState({ id: id });
    // this.props.checkRoom(this.state.code);
  }

  async addPlayer(name) {
    const roomExists = await this.checkRoomCode(this.state.code);
    if (roomExists && name) {
      const playerId = name + this.state.id;
      this.setState({ playerId });
      this.props.addAPlayer({
        name,
        id: playerId,
        draw: '',
        photo: '',
        roomId: this.state.code,
        //status: 'drawing', capturing
      });
      this.props.addPlayerToRoom(playerId, name, this.state.code);
      this.props.navigation.navigate('DrawCanvas');
      //this.props.navigation.navigate('Waiting');
    } else {
      this.setState({ roomExists: false });
    }
  }

  async checkRoomCode(code) {
    const snapshot = await db
      .database()
      .ref(`rooms/${code}`)
      .once('value');
    return snapshot.exists();
  }

  // addPlayerToRoom()

  render() {
    let checkName = this.state.name.trim() !== '';
    let checkChar = /^[a-zA-Z]*$/g.test(this.state.name);
    return (
      <DismissKeyboard>
        <View style={styles.joinOrCreateRoomContainer}>
          <View style={styles.nonButtonContainerCreate}>
            <View style={styles.container}>
              <Text style={styles.textCreateName}>Enter your name</Text>
              <TextInput
                style={styles.textEnter}
                placeholder="Your Name Here"
                onChangeText={text => {
                  this.setState({
                    name: text,
                  });
                }}
              />
              {checkName &&
                !checkChar && (
                  <Text style={styles.buttonText}>Letters Only</Text>
                )}

              <Text style={styles.textCreateName}>Enter room code</Text>
              <TextInput
                style={styles.textEnter}
                placeholder="Your Code Here"
                onChangeText={text => {
                  this.setState({
                    code: text,
                  });
                }}
              />
              {this.state.roomExists === false && (
                <Text style={styles.buttonText}>Invalid Room Number</Text>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                if (!checkName) {
                  return Alert.alert(
                    'Who are you?',
                    'Name Required',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                  );
                }
                if (checkName && checkChar) {
                  this.addPlayer(this.state.name);
                }
              }}
            >
              <Text style={styles.startButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = stylesDefault;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     margin: 80,
//     backgroundColor: '#00BFFF',
//     height: 40,
//     justifyContent: 'center',
//     width: 75,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textEnter: {
//     height: 40,
//     width: '70%',
//     margin: 20,
//     padding: 10,
//     borderColor: '#40E0D0',
//     borderWidth: 1,
//     backgroundColor: 'white',
//   },
// });

const mapStateToProps = state => {
  return {
    players: state.players,
    roomId: state.rooms.room.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAPlayer: player => dispatch(FBAddPlayer(player)),
    // checkRoom: roomId => dispatch(getOneRoom(roomId)),
    addPlayerToRoom: (playerId, playerName, roomId) =>
      dispatch(addToRoom(playerId, playerName, roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
