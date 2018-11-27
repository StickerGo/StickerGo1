import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
import { getPlayersinRoom } from '../reducer/roomReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

class DisplayWait extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      players: '',
      allplayers: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          {/* style={styles.button}

              // onPress={() => this.props.navigation.navigate('VoteScreen')} */}
          {checkPhoto ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('VoteScreen')}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.buttonText}>Waiting</Text>
          )}
          <Text style={styles.buttonText}>Starting Game</Text>
        </View>
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
)(DisplayWait);
