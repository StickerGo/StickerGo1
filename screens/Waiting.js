import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
import { getPlayersInRoom } from '../reducer/roomReducer';
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

  getPlayers(roomId) {
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
    const players = this.getPlayers(this.props.navigation.getParam('roomId'));
    this.setState({ players });
  }
  render() {
    const roomId = this.props.navigation.getParam('roomId');
    return (
      <View style={styles.container}>
        <Text>{this.props.room}</Text>
        {/* {players.map(player => (
          <Text key={player.name}>{player.name}</Text>
        ))} */}
        {counter === 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('DrawCanvas')}
              title="Start Game"
              color="white"
            />
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {/* {this.state.players.map(player => ( */}
            <Text>{this.state.players}</Text>
            {/* ))} */}
            <Button
              onPress={() => this.props.navigation.navigate('Vote')}
              title="Go to Vote"
              color="white"
            />
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
    players: state.players,
    room: state.room,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getAll: () => dispatch(getAllPlayers()),
    // getPlayers: room => dispatch(getPlayersInRoom(room)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
