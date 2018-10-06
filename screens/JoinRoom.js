import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { FBAddPlayer } from '../reducer/playerReducer';
import { stylesDefault } from '../styles/componentStyles';
import { getOneRoom, addToRoom } from '../reducer/roomReducer';
import db from '../reducer/firebase';

function checkRoomCodeCallback(code, exists) {
  if (exists) {
    console.log('THE ROOM EXISTS!');
    return true;
  } else {
    console.log('THE ROOM DOES NOT EXIST :(');
    return false;
  }
}

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
    if (roomExists) {
      const playerId = name + this.state.id;
      this.setState({ playerId });
      this.props.addAPlayer({
        name,
        id: playerId,
        draw: '',
        photo: '',
        roomId: this.state.code,
      });
      this.props.addPlayerToRoom(playerId, name, this.state.code);
      // this.props.navigation.navigate('DrawCanvas', {
      //   userId: this.state.name + this.state.id,
      //   roomId: this.state.code,
      // });
      this.props.navigation.navigate('Waiting', {
        // userId: this.state.name + this.state.id,
        // roomId: this.state.code,
      });
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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightpink',
        }}
      >
        <View style={styles.nonButtonContainer}>
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
          {checkName && <Text>Name is Required</Text>}
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
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              this.addPlayer(this.state.name);
            }}
          >
            <Text style={styles.startButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
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
