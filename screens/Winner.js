import React, { Component } from 'react';
import { Alert, AppRegistry, Button, View, Text } from 'react-native';
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
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Waiting')}
            title="Play Again"
            color="white"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Home')}
            title="Exit"
            color="white"
          />
        </View>
      </View>
    );
  }
}

// const styles = stylesWinner;
const styles = stylesDefault;
