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

class WinnerWaiting extends Component {
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      votes: 0,
    };
  }

  async componentDidMount() {
    await this.props.getRoom(this.props.navigation.getParam('roomId'));
  }

  render() {
    let play = this.props.room.players;
    let playersArray = [];
    let votecount = 0
    if (typeof play === 'object') {
      playcount = Object.getOwnPropertyNames(play).length;
      let playerKeys = Object.keys(play);
      for (let i = 0; i < playerKeys.length; i++) {
        votecount = votecount + Number(play[playerKeys[i]].votes)
      }
    }
    let checkvotes;
    if (Number(this.props.roomSize) === votecount) {
      checkvotes = true;
    } else {
      checkvotes = false;
    }
    return (
      <View style={styles.waitingContainer}>
        {this.props ? (
          <View style={styles.list}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {checkvotes ? (
                <TouchableOpacity
                  style={styles.seeWinnerButton}
                  onPress={() => this.props.navigation.navigate('Winner')}
                >
                  <Text style={styles.buttonTextHome}>See the Winner!</Text>
                </TouchableOpacity>
              ) : (
                  <View>
                    <Image
                      style={styles.loadingImage}
                      source={require('../assets/images/loading_bears.gif')}
                    />
                    <Text style={styles.waitingText}>
                      Waiting For All Votes...
                  </Text>
                  </View>
                )}
            </View>
          </View>
        ) : (
            <View style={styles.buttonGroup}>
              <Text style={styles.text}>Something Went Wrong</Text>
              {checkvotes ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.props.navigation.navigate('Winner', {
                      roomId: this.props.navigation.getParam('roomId'),
                    })
                  }
                >
                  <Text style={styles.buttonText}>Go To Vote</Text>
                </TouchableOpacity>
              ) : (
                  <Text style={styles.buttonText}>Waiting</Text>
                )}
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
)(WinnerWaiting);
