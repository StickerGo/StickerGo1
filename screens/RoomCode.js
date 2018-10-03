import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
// import { stylesRoomCode } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import { FBAddPlayer } from '../reducer/playerReducer';
import { connect } from 'react-redux';

class RoomCode extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      code: '01',
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
  }
  render() {
    return (
      <View style={styles.container}>
        <Text />
        <Text style={styles.text}>Here is your code:</Text>
        <Text />
        <Text style={styles.text}>{this.props.roomId}</Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              this.props.navigation.navigate('Waiting', {
                roomId: this.props.roomId,
              })
            }
            title="Start Game"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomId: state.rooms.room.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: player => dispatch(FBAddPlayer(player)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomCode);

<<<<<<< HEAD
const styles = stylesRoomCode;
=======
// const styles = stylesRoomCode;
const styles = stylesDefault;
>>>>>>> master
