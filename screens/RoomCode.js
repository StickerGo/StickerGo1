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
import { stylesRoomCode } from '../styles/componentStyles';

export default class RoomCode extends Component {
  _onPressButton() {}
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
        <Text style={styles.text}>Here's your code:</Text>
        <Text />
        <Text style={styles.text}>{this.state.code}</Text>
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
const styles = stylesRoomCode;
