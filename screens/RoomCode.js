import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Picker,
  Text,
  TextInput,
} from 'react-native';

export default class RoomCode extends Component {
  _onPressButton() { }
  constructor() {
    super();
    this.state = {
      code: '01',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text />
        <Text style={styles.welcome}>Here's your code:</Text>
        <Text />
        <Text style={styles.welcome}>{this.state.code}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Waiting')}
            title="Start Game"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 40,
    justifyContent: 'center',
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEnter: {
    height: 40,
    width: 100,
    margin: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
