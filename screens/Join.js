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

export default class Room extends React.Component {
  _onPressButton() {}
  constructor() {
    super();
    this.state = {
      pickval: 2,
      typedText: 'Enter name',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textEnter}
          placeholder="Enter name"
          onChangeText={text => {
            this.setState(previousState => {
              return { typedText: text };
            });
          }}
        />
        <Text />
        <TextInput
          style={styles.textEnter}
          placeholder="Enter code"
          onChangeText={text => {
            this.setState(previousState => {
              return { typedText: text };
            });
          }}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="Start" />
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
    margin: 20,
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
