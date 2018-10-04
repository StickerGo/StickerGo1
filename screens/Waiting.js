import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

let counter = 1;

class Waiting extends Component {
  _onPressButton() {}
  componentDidMount() {
    this.props.getAll();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props && this.props.players.length ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('DrawCanvas')}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            {/* {this.state.players.map(player => ( */}
            {/* <Text>"Player name"</Text> */}
            {/* ))} */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Vote')}
            >
              <Text style={styles.buttonText}>Go To Vote</Text>
            </TouchableOpacity>
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
    players: state.players.players,
    roomSize: state.rooms.room.numPlayers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAllPlayers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);
