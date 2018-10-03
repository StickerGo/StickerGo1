import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';
//import { stylesCreate } from '../styles/componentStyles';
import { stylesDefault } from '../styles/componentStyles';

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
        <View>
          <Text style={styles.heading}>StickerGo</Text>
          <Text style={styles.text}>go STICK it!</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Room');
            }}
          >
            <Text style={styles.buttonText}>Create a Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Join')}
          >
            <Text style={styles.buttonText}>Join a Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = stylesCreate;
const styles = stylesDefault;

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
