import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getAllPrompts } from '../reducer/promptReducer';
import { getWinner, playerExitGame } from '../reducer/playerReducer';
import { exitGame, resetRoom, getWinnerId } from '../reducer/roomReducer';
import { stylesDefault } from '../styles/componentStyles';

class Winner extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      name: 'name',
      winners: [],
    };
  }
  async componentDidMount() {
    this.props.getAllPrompts();
    await this.props.getWinnerId(this.props.roomId);
    const winnersArray = [];
    for (let i = 0; i < this.props.winners.length; i++) {
      const winner = await this.props.getTheWinner(this.props.winners[i]);
      this.setState({
        winners: [...this.props.winner],
      });
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LinearGradient colors={['cadetblue', 'lightpink']} style={{ flex: 1 }}>
          {this.props.winner && (
            <View style={styles.scrollContainerVote}>
              {this.props.winner.length > 1 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollView}
                >
                  <Text style={styles.textWinner}>
                    There is a tie! (Scroll down)
                  </Text>
                  {this.props.winner.map(winner => {
                    return (
                      <View style={{ flex: 2 }} key={winner.id}>
                        <Text key={winner.id} style={styles.winnerText}>
                          {winner.name}
                        </Text>
                        <Image
                          style={styles.unselectedImageStyle}
                          source={{ isStatic: true, uri: winner.photo }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                this.props.winner.map(winner => {
                  return (
                    <View key={winner.id}>
                      <Text style={styles.textWinner}>
                        Winner is {winner.name}!
                      </Text>
                      <Image
                        style={{
                          alignSelf: 'center',
                          width: 300,
                          height: 300,
                          borderWidth: 3,
                          borderColor: 'white',
                        }}
                        source={{ isStatic: true, uri: winner.photo }}
                      />
                    </View>
                  );
                })
                // </View>
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.undoButton}
              onPress={() => {
                this.props.exit();
                this.props.navigation.navigate('Home');
              }}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.rooms.room,
    winner: state.players.winner,
    roomId: state.rooms.room.id,
    winners: state.rooms.room.winnerId,
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

const styles = stylesDefault;
