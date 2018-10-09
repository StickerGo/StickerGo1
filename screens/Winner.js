import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  Alert,
  AppRegistry,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
// import { stylesWinner } from '../styles/componentStyles';
import { connect } from 'react-redux';
import { getAllPrompts, getOnePrompt } from '../reducer/promptReducer';
import { getWinner, playerExitGame } from '../reducer/playerReducer';
import { exitGame, resetRoom, getWinnerId } from '../reducer/roomReducer';
import { stylesDefault } from '../styles/componentStyles';

class Winner extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      name: 'name',
    };
  }
  async componentDidMount() {
    this.props.getAllPrompts();
    await this.props.getWinnerId(this.props.roomId);

    await this.props.getTheWinner(this.props.room.winnerId);
  }
  replay() {
    let newPrompt = this.props.prompts[
      Math.floor(Math.random() * this.props.prompts.length)
    ];
    while (newPrompt === this.props.room.promptForRoom) {
      newPrompt = this.props.prompts[
        Math.floor(Math.random() * this.props.prompts.length)
      ];
    }
    const roomInfo = this.props.room;
    this.props.reset(roomInfo, newPrompt);
    this.props.navigation.navigate('Waiting');
  }
  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        {/* <LinearGradient
          colors={['#192f6a', 'cadetblue', 'lightpink']}
          style={styles.linearGradientstyle}
        > */}
        <Text style={{ color: 'black' }}>Winner is: </Text>
        {this.props.winner && (
          <View style={{ flex: 1, backgroundColor: 'pink' }}>
            <Text style={{ color: 'yellow' }}>{this.props.winner.name}</Text>
            <Image
              style={styles.image}
              source={{ uri: this.props.winner.photo }}
            />
          </View>
        )}

        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'purple' }}
            onPress={() => {
              // this.props.reset(this.props.room, this.props.prompts);
              this.replay();
              // this.props.navigation.navigate('Waiting');
            }}
          >
            <Text style={{ color: 'black' }}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, color: 'blue' }}
            onPress={() => {
              this.props.exit();
              this.props.navigation.navigate('Home');
            }}
          >
            <Text style={{ color: 'red' }}>Exit</Text>
          </TouchableOpacity>
        </View>
        {/* </LinearGradient> */}
      </View>
    );
  }
}

// <Text style={styles.heading2}>{this.props.winner}</Text>

const mapStateToProps = state => {
  return {
    room: state.rooms.room,
    winner: state.players.winner,
    roomId: state.rooms.room.id,
    prompts: state.prompts.prompts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPrompts: () => dispatch(getAllPrompts()),
    getTheWinner: winnerId => dispatch(getWinner(winnerId)),
    exit: () => {
      dispatch(playerExitGame());
      dispatch(exitGame());
    },
    reset: (roomInfo, newPrompt) => {
      dispatch(resetRoom(roomInfo, newPrompt));
    },
    getWinnerId: roomId => dispatch(getWinnerId(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Winner);

// const styles = stylesWinner;
const styles = stylesDefault;
