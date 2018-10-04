import React, { Component } from 'react';
import { Alert, AppRegistry, TouchableOpacity, View, Text } from 'react-native';
// import { stylesWinner } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

export default class Winner extends Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      name: 'name',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text />
        <Text style={styles.welcome}>Winner is: </Text>
        <Text />
        <Text style={styles.welcome}>{this.state.name}</Text>
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

// const styles = stylesWinner;
const styles = stylesDefault;
