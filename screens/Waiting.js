import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
// import { getOneRoom } from '../reducer/roomReducer';
import { getPlayersinRoom, getOneRoom } from '../reducer/roomReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';
import db from '../reducer/firebase';
let counter = 2;

class Waiting extends Component {
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      count: 1,
      players: '',
      allplayers: [],
    };
  }

  async componentDidMount() {
    await this.props.getRoom(this.props.navigation.getParam('roomId'))
  }

  render() {
    let play = this.props.room.players;
    let playersArray = []
    let playcount;
    if (typeof play === 'object') {
      playcount = Object.getOwnPropertyNames(play).length;
      let playerKeys = Object.keys(play)
      for (let i = 0; i < playerKeys.length; i++) {
        playersArray.push(play[playerKeys[i]])
      }
    }
    let checknum;
    if (Number(this.props.roomSize) <= playcount) {
      checknum = true;
    } else {
      checknum = false;
    }
    return (
      <View style={styles.waitingContainer}>
        {this.props ? (
          <View style={styles.list}>
            <View style={{ flex: 1 }}>
              {playersArray.map(player => {
                return <Text key={player.name} style={styles.nameText}>{player.name}</Text>
              })}
            </View>
            <View>
              {checknum ? (
                <TouchableOpacity
                  style={styles.beginButton}
                  onPress={() => this.props.navigation.navigate('DrawCanvas')}
                >
                  <Text style={styles.buttonTextHome}>Start Game</Text>
                </TouchableOpacity>
              ) : (
                  <View>
                    <Image
                      style={styles.loadingImage}
                      source={{
                        uri:
                          'https://media.giphy.com/media/9JgeNOiRwsvbg9RVsq/giphy.gif',
                      }}
                    />
                    <Text style={styles.waitingText}>Waiting For More Players...</Text>
                  </View>
                )}
            </View>
            {counter--}

          </View>
        ) : (
            <View style={styles.buttonGroup}>
              <Text style={styles.text}>
                Something Went Wrong
              </Text>
              {checknum ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.props.navigation.navigate('VoteScreen', {
                      roomId: this.props.navigation.getParam('roomId'),
                    })
                  }
                >
                  <Text style={styles.buttonText}>Go To Vote</Text>
                </TouchableOpacity>
              ) : (
                  <Text style={styles.buttonText}>Waiting</Text>
                )}
              {console.log('VALUE', counter)}
              {counter++}
            </View>
          )}
      </View>
    );
  }
}

const styles = stylesDefault;

const mapStateToProps = state => {
  return {
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
    roomId: state.rooms.room.id,
    room: state.rooms.room,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAllPlayers()),
    getPlayersinRoom: roomId => dispatch(getPlayersinRoom(roomId)),
    getRoom: roomId => dispatch(getOneRoom(roomId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
