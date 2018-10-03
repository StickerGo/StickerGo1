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
    };
  }

  getPlayers() {
    db.database()
      .ref('players')
      .orderByChild('roomId')
      .equalTo(this.props.navigation.getParam('roomId'))
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          let player = childSnapshot.val();
          return player;
        });
      });
  }
  componentDidMount() {
    // this.props.getAll();
    // this.props.getPlayers(this.props.navigation.getParam('roomId'));
    //
    //
  }
  render() {
    // const roomId = this.props.navigation.getParam('roomId');
    const players = this.getPlayers();

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
            {/* {this.props.players.map(player => ( */}
            <Text>{this.player}</Text>
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
    getPlayers: room => dispatch(getPlayersInRoom(room)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
