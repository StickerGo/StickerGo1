import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { FBAddPlayer } from '../reducer/playerReducer';
import { stylesDefault } from '../styles/componentStyles';
import { getOneRoom, addToRoom } from '../reducer/roomReducer';
import db from '../reducer/firebase';

function checkRoomCodeCallback(code, exists) {
  if (exists) {
    console.log('THE ROOM EXISTS!')
    return true
  } else {
    console.log('THE ROOM DOES NOT EXIST :(')
    return false
  }
}

class Join extends React.Component {
  _onPressButton() { }
  constructor(props) {
    super(props);
    this.state = {
      pickval: 2,
      name: 'Enter name',
      code: '',
      id: '',
      playerId: ''
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.checkRoomCode = this.checkRoomCode.bind(this)
    // this.checkRoomCodeCallback = this.checkRoomCodeCallback.bind(this)
  }

  componentDidMount() {
    const randomNum = Math.floor(Math.random() * 1000 + 1);
    //once we connect with the room generator, add to id
    const id = randomNum;
    this.setState({ id: id });
    // this.props.checkRoom(this.state.code);
  }
  // checkRooms(roomId) {
  //   let value;
  //   let roomcheck;
  //   let check = db
  //     .database()
  //     .ref('rooms')
  //     .child('id')
  //     .once('value', function(snapshot) {
  //       value = snapshot.val();
  //       if (value === { roomId }) roomcheck = true;
  //       else {
  //         roomcheck = false;
  //       }
  //       console.log('Check room ', value);
  //     });
  //   return roomcheck;
  // }

  async addPlayer(name) {
    const playerId = name + this.state.id
    this.setState({ playerId })
    this.props.addAPlayer({
      name,
      id: playerId,
      draw: '',
      photo: '',
      roomId: this.state.code,
    });
    const rooms = await this.checkRoomCode(this.state.code)
    console.log('DID YA WORK?', rooms)
    this.props.addPlayerToRoom(playerId, this.state.code)
  }



  checkRoomCode(code) {
    const roomRef = db
      .database()
      .ref('rooms')
      .child(code)
      .once('value', function (snapshot) {
        let exists = (snapshot.val() !== null)
        console.log('what is snapshot.val', snapshot.val())
        console.log('what is exists', exists)
        checkRoomCodeCallback(code, exists)
      })
  }

  // addPlayerToRoom()

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nonButtonContainer}>
          <Text style={styles.text}>Enter your name</Text>
          <TextInput
            style={styles.textEnter}
            placeholder="your name here"
            onChangeText={text => {
              this.setState({
                name: text,
              });
            }}
          />
          <Text style={styles.text}>Enter room code</Text>
          <TextInput
            style={styles.textEnter}
            placeholder="room code here"
            onChangeText={text => {
              this.setState({
                code: text,
              });
            }}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addPlayer(this.state.name);
              this.props.navigation.navigate('Waiting', {
                userId: this.state.name + this.state.id,
                roomId: this.state.code,
              });
            }}
          >
            <Text style={styles.buttonText}>Start</Text>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAPlayer: player => dispatch(FBAddPlayer(player)),
    // checkRoom: roomId => dispatch(getOneRoom(roomId)),
    addPlayerToRoom: (playerId, roomId) => dispatch(addToRoom(playerId, roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
