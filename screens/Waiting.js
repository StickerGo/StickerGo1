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
  }

  getPlayersinRoom(roomId) {
    let playername;
    db.database()
      .ref('players')
      .child(roomId)
      .child('name')
      .on('value', function(snapshot) {
        playername = snapshot.val();
      });
    return playername;
  }

  componentDidMount() {
    // this.props.getAll();
    const players = this.getPlayersinRoom(
      this.props.navigation.getParam('roomId')
    );
    this.setState({ players });
    this.props.getAll();
  }
  render() {
    const roomId = this.props.navigation.getParam('roomId');
    return (
      <View style={styles.container}>
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
            {/* {this.state.players.map(player => ( */}
            <Text>{this.state.players}</Text>
            {/* ))} */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Vote')}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getAll: () => dispatch(getAllPlayers()),
    // fetchPlayers: room => dispatch(getPlayersinRoom(room)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
