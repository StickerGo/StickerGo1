import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';
// import { stylesWaiting } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

let counter = 1;

class Waiting extends Component {
  _onPressButton() {}
  componentDidMount() {
    this.props.getAll();
    //
    //
  }
  render() {
    return (
      <View style={styles.container}>
        {counter === 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Start Game"
              color="white"
            />
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {/* {this.state.players.map(player => ( */}
            {/* <Text>"Player name"</Text> */}
            {/* ))} */}
            <Button
              onPress={() => this.props.navigation.navigate('Contest')}
              title="Go to Vote"
              color="white"
            />
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
    players: state.players,
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
