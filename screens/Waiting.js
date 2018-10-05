import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
import { getPlayersinRoom } from '../reducer/roomReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import db from '../reducer/firebase';
let counter = 1;

class Waiting extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      count: 1,
      players: '',
      allplayers: [],
    };
    // this.getPlayersinRoom = this.getPlayersinRoom.bind(this);
  }

  componentDidMount() {
    // const roomId = this.props.room
    // this.props.getRoomInfo(roomId);
    // this.props.getPlayersinRoom(this.props.room);
  }

  render() {
    // const playersList = this.getPlayersinRoom();
    const roomId = this.props.room;
    // console.log('find room id', this.props.room);
    console.log('When they join', this.props.roomSize);
    console.log('Find players count', this.props.players.length);
    let checknum;
    if (this.props.roomSize === this.props.players.length) {
      checknum = true;
    } else {
      checknum = false;
    }
    console.log(checknum, 'Check');
    return (
      <View style={styles.container}>
        {/* {this.props.roomSize === this.props.players.length ? ( */}
        {this.props && this.props.players.length ? (
          <View style={styles.buttonGroup}>
            {this.props.roomSize === this.props.players.length ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('DrawCanvas')}
              >
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.buttonText}>Waiting</Text>
            )}
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            {/* {array.map(player => (
              <Text style={styles.text} key={player.name}>
                {player.name}
              </Text>
            ))} */}
            <Text style={styles.test}>{this.props.roomId}</Text>
            {/* ))} */}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('VoteScreen', {
                  roomId: this.props.navigation.getParam('roomId'),
                })
              }
            >
              <Text style={styles.buttonText}>Go To Vote</Text>
            </TouchableOpacity>
            {counter--}
          </View>
        )}
      </View>
    );
  }
}

// const styles = stylesWaiting;
const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
    room: state.rooms.room.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAllPlayers()),
    getPlayersinRoom: roomId => dispatch(getPlayersinRoom(roomId)),
    getRoomInfo: roomId => dispatch(getOneRoom(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
