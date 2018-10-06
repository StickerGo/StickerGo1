import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { stylesDefault } from '../styles/componentStyles';
import { FBAddPlayer } from '../reducer/playerReducer';
import { addToRoom } from '../reducer/roomReducer';
import { connect } from 'react-redux';

class RoomCode extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      code: '01',
      roomId: '',
      name: '',
    };
    this.playerId = Math.floor(Math.random() * 1000 + 1);
  }
  componentDidMount() {
    const id = this.props.navigation.getParam('name') + this.playerId;
    const name = this.props.navigation.getParam('name');
    this.setState({ roomId: this.props.roomId });

    this.props.addPlayer({
      name: this.props.navigation.getParam('name'),
      id,
      draw: '',
      photo: '',
      roomId: this.props.roomId,
    });

    this.props.addToRoom(id, name, this.props.roomId);
  }

  render() {
    console.log('ROOM ID IN ROOM CODE', this.props.roomId);
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyle}
        >
          <View style={styles.nonButtonContainer}>
            <Text style={styles.text}>Here is your code:</Text>
            <View style={styles.textBkg}>
              <Text style={styles.codeText}>{this.state.roomId}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.startButton}
              //update to send to "Waiting" room later
              onPress={() => this.props.navigation.navigate('DrawCanvas')}
            >
              <Text style={styles.startButtonText}>start</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomId: state.rooms.room.id,
    player: state.players.player,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: player => dispatch(FBAddPlayer(player)),
    addToRoom: (playerId, playerName, roomId) =>
      dispatch(addToRoom(playerId, playerName, roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomCode);

// const styles = stylesRoomCode;
const styles = stylesDefault;
