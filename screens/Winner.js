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
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      name: 'name',
      winners: []
    };
  }
  async componentDidMount() {
    this.props.getAllPrompts();
    await this.props.getWinnerId(this.props.roomId);
    const winnersArray = []
    for (let i = 0; i < this.props.winners.length; i++) {
      const winner = await this.props.getTheWinner(this.props.winners[i]);
      this.setState({
        winners: [...this.props.winner]
      })
    }
    this.props.getAllPrompts();
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
        <Text style={{ color: 'black' }}>Winner is: </Text>
        {this.props.winner && (
          <View style={{ flex: 1, backgroundColor: 'pink' }}>
            {
              this.props.winner.map(winner => {
                return (
                  <View style={{ flex: 2 }} key={winner.id}>
                    <Text key={winner.id} style={{ color: 'yellow' }}>{winner.name}</Text>
                    <Image style={{ flex: 1, borderColor: 'red' }} source={{ isStatic: true, uri: winner.photo }} />
                  </View>
                )
              })
            }
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
            style={{ flex: 1 }}
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
<<<<<<< HEAD
    winners: state.rooms.room.winnerId
=======
    prompts: state.prompts.prompts,
>>>>>>> master
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
