import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
import { getPlayersinRoom } from '../reducer/roomReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import db from '../reducer/firebase';
let counter = 2;

class Waiting extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      count: 1,
      players: '',
      allplayers: [],
    };
  }

  componentDidMount() {}

  render() {
    let play = this.props.room.players;
    let playcount;
    if (typeof play === 'object') {
      playcount = Object.getOwnPropertyNames(play).length;
    }
    let checknum;
    if (Number(this.props.roomSize) === playcount) {
      checknum = true;
    } else {
      checknum = false;
    }
    return (
      <View style={styles.container}>
        {/* {this.props && this.props.players ? ( */}
        {this.props ? (
          <View style={styles.buttonGroup}>
            {checknum ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('DrawCanvas')}
              >
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.buttonText}>Waiting</Text>
            )}
            {counter--}
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            {/* {array.map(player => (
              <Text style={styles.text} key={player.name}>
                {player.name}
              </Text>
            ))} */}
            {/* ))} */}
            {checknum ? (
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
            ) : (
              <Text style={styles.buttonText}>Waiting</Text>
            )}
            {console.log('VALUE', counter)}
            {counter++}
          </View>
        )}
      </View>
    );
  }
}

const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
    roomId: state.rooms.room.id,
    room: state.rooms.room,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAllPlayers()),
    getPlayersinRoom: roomId => dispatch(getPlayersinRoom(roomId)),
    getOneRoom: roomId => dispatch(getOneRoom(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
