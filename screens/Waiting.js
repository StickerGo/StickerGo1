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
    // const roomId = this.props.navigation.getParam('roomId');
  }

  render() {
    // const playersList = this.getPlayersinRoom();
    console.log('find room id', this.props.room);
    console.log(' Find roomId', this.props.players[0].roomId);
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('DrawCanvas')}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
