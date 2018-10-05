import React, { Component } from 'react';
import { Button, TouchableOpacity, View, Text } from 'react-native';
// import { stylesRoomCode } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import { FBAddPlayer } from '../reducer/playerReducer';
import { addToRoom } from '../reducer/roomReducer'
import { connect } from 'react-redux';

class RoomCode extends Component {
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      code: '01',
      roomId: ''
    };
    this.playerId = Math.floor(Math.random() * 1000 + 1);
  }
  componentDidMount() {
    const id = this.props.navigation.getParam('name') + this.playerId;
    this.props.addPlayer({
      name: this.props.navigation.getParam('name'),
      id,
      draw: '',
      photo: '',
      roomId: this.props.roomId,
    });
    this.setState({ roomId: this.props.roomId })
    this.props.addPlayerToRoom(id, this.props.roomId)
  }

  render() {
    console.log('ROOM ID', this.state.roomId)
    return (
      <View style={styles.container}>
        <View style={styles.nonButtonContainer}>
          <Text style={styles.heading}>Here is your code:</Text>
          <View style={styles.textBkg}>
            <Text style={styles.text}>{this.state.roomId}</Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}

            //update to send to "Waiting" room later
            onPress={() => this.props.navigation.navigate('DrawCanvas')}

          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
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
    addPlayerToRoom: (playerId, roomId) => dispatch(addToRoom(playerId, roomId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomCode);

// const styles = stylesRoomCode;
const styles = stylesDefault;
