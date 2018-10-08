import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { FBAddPlayer } from '../reducer/playerReducer';
import { stylesDefault } from '../styles/componentStyles';
import { addToRoom, getOneRoom } from '../reducer/roomReducer';
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

class Join extends React.Component {
  _onPressButton() { }
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
      // this.props.getRoom(this.state.code)
      console.log('was the room saved to props?', this.props.room)
      this.props.navigation.navigate('Waiting', { roomId: this.state.code });
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
    let checkName = this.state.name.trim() === '';
    let checkChar = !/^[a-zA-Z]*$/g.test(this.state.name);
    return (
      <ScrollView contentContainerStyle={styles.joinOrCreateRoomContainer}>
        <View style={styles.nonButtonContainer}>
          {this.state.nameEntered === false && <Text>Name required</Text>}
          <Text style={styles.text}>Enter your name</Text>
          <TextInput
            style={styles.textEnter}
            placeholder="Your Name Here"
            onChangeText={text => {
              this.setState({
                name: text,
              });
            }}
          />
          {checkName && <Text style={styles.text}>Name is Required</Text>}
          {checkChar && <Text style={styles.text}>Letters Only</Text>}
          {this.state.roomExists === false && (
            <Text style={styles.text}>Invalid Room Number</Text>
          )}
          <Text style={styles.text}>Enter room code</Text>
          <TextInput
            style={styles.textEnter}
            placeholder="Your Code Here"
            onChangeText={text => {
              this.setState({
                code: text,
              });
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              if (this.state.name.trim() !== '' && !checkChar) {
                this.addPlayer(this.state.name);
              }
            }}
          >
            <Text style={styles.startButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    players: state.players,
    roomId: state.rooms.room.id,
    room: state.rooms.room
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAPlayer: player => dispatch(FBAddPlayer(player)),
    // checkRoom: roomId => dispatch(getOneRoom(roomId)),
    addPlayerToRoom: (playerId, playerName, roomId) => dispatch(addToRoom(playerId, playerName, roomId)),
    getRoom: roomId => dispatch(getOneRoom(roomId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
