import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { stylesCreate } from '../styles/componentStyles';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.props.navigation.navigate('Room');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.createButtonContainer}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Room');
            }}
            title="Create a Room"
            color="#FFFFFF"
          />
        </View>
        <Text style={styles.text}>OR</Text>
        <View style={styles.joinButtonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Join')}
            title="Join a Room"
            color="#FFFFFF"
          />
        </View>
      </View>
    );
  }
}

const styles = stylesCreate;

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
