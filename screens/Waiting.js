import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getAllPlayers } from '../reducer/playerReducer';

let counter = 1;

class Waiting extends Component {
  _onPressButton() {}
  componentDidMount() {
    this.props.getAll();
  }
  render() {
    return (
      <View style={styles.container}>
        {counter === 0 ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Start"
            />
            {counter++}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {this.state.players.map(player => (
              <Text>{player.name}</Text>
            ))}
            <Button
              onPress={() => this.props.navigation.navigate('Contest')}
              title="Go to Vote"
              color="#841584"
            />
            {counter--}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

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
