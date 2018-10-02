import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  joinButtonContainer: {
    margin: 80,
    backgroundColor: '#00BFFF',
    height: 50,
    justifyContent: 'center'

  },
  createButtonContainer: {
    margin: 80,
    backgroundColor: '#40E0D0',
    height: 50,
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
