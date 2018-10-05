import React, { Component } from 'react';
import { Alert, AppRegistry, TouchableOpacity, View, Text } from 'react-native';
// import { stylesWinner } from '../styles/componentStyles';
import { connect } from 'react-redux';
import { getWinner } from '../reducer/playerReducer';
import { getOneRoom } from '../reducer/roomReducer';
import { stylesDefault } from '../styles/componentStyles';

class Winner extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      name: 'name',
    };
  }
  componentDidMount() {
    this.props.getRoom(this.props.player.roomId);
    this.props.getTheWinner(this.props.room.winnerId);
  }
  render() {
    if (this.props) {
      return (
        <View style={styles.container}>
          <Text />
          <Text style={styles.heading2}>Winner is: </Text>
          <Text />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Waiting')}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

// <Text style={styles.heading2}>{this.props.winner}</Text>

const mapStateToProps = state => {
  return {
    player: state.players.player,
    room: state.rooms.room,
    winner: state.players.winner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => dispatch(getOneRoom(roomId)),
    getTheWinner: winnerId => dispatch(getWinner(winnerId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Winner);

// const styles = stylesWinner;
const styles = stylesDefault;
