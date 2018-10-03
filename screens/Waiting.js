import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

let counter = 1;

class Waiting extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      room: '',
    };
    // const roomId = this.props.navigation.getParam('roomId');
  }
  componentDidMount() {
    this.props.getAll();
    this.props.getOneRoom(this.roomId);
    //
    //
  }
  render() {
    const roomId = this.props.navigation.getParam('roomId');

    return (
      <View style={styles.container}>
        <Text>{roomId}</Text>
        <Text>
          {/* {this.props.players.filter(name => players.roomId === roomId)} */}
        </Text>
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
            <Text>{roomId}</Text>
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
    getAll: () => dispatch(getAllPlayers()),
    getRoom: room => dispatch(getOneRoom(room)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
